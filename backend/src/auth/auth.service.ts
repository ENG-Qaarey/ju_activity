import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import * as crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import { AuditLogsService } from '../audit-logs/audit-logs.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly auditLogs: AuditLogsService,
  ) { }

  private signToken(user: { id: string; email: string; role: any; passwordVersion: number }) {
    const secret = this.config.get<string>('JWT_SECRET') || process.env.JWT_SECRET;
    if (!secret) {
      throw new BadRequestException('JWT_SECRET is not configured');
    }

    return jwt.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
        pv: user.passwordVersion,
      },
      secret,
      { expiresIn: '7d' },
    );
  }

  private normalizeEmail(email: string) {
    return email.trim().toLowerCase();
  }

  private sanitizeUser(user: any) {
    if (!user) {
      return null;
    }
    const { passwordHash, ...rest } = user;
    return rest;
  }

  async login(email: string, password: string) {
    const normalizedEmail = this.normalizeEmail(email);
    const user = await this.usersService.findByEmail(normalizedEmail);
    if (!user) {
      await this.auditLogs.create({
        action: 'LOGIN_FAILURE',
        actorId: null,
        targetId: null,
        entity: 'auth',
        entityId: null,
        message: `Failed login for ${normalizedEmail}`,
        metadata: { email: normalizedEmail },
      });
      throw new UnauthorizedException('Invalid email or password');
    }
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      await this.auditLogs.create({
        action: 'LOGIN_FAILURE',
        actorId: user.id,
        targetId: user.id,
        entity: 'auth',
        entityId: null,
        message: `Failed login for ${user.email}`,
        metadata: { email: user.email },
      });
      throw new UnauthorizedException('Invalid email or password');
    }

    // Email verification is disabled. For backward compatibility with existing
    // accounts created under the old flow, auto-activate students on login.
    if (user.status !== 'active') {
      if (user.role === 'student') {
        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            status: 'active',
            emailVerified: true,
            emailVerificationCodeHash: null,
            emailVerificationCodeExpiresAt: null,
          },
        });
      } else {
        throw new UnauthorizedException('Account is inactive');
      }
    }

    const token = this.signToken(user);

    await this.auditLogs.create({
      action: 'LOGIN_SUCCESS',
      actorId: user.id,
      targetId: user.id,
      entity: 'auth',
      entityId: null,
      message: `User login: ${user.email}`,
    });

    return { success: true, user: this.sanitizeUser(user), token };
  }

  async register(payload: {
    name: string;
    email: string;
    password: string;
    role?: 'student' | 'coordinator' | 'admin';
    studentId?: string;
    department?: string;
    avatar?: string;
  }) {
    const role = payload.role ?? 'student';
    if (role !== 'student') {
      throw new BadRequestException('Only student registration is allowed');
    }

    const normalizedEmail = this.normalizeEmail(payload.email);
    const createdUser = await this.usersService.create({
      ...payload,
      email: normalizedEmail,
      role,
      status: 'active',
      emailVerified: true,
    });

    const createdForToken = await this.prisma.user.findUnique({
      where: { id: createdUser.id },
      select: { id: true, email: true, role: true, passwordVersion: true },
    });

    const token = createdForToken ? this.signToken(createdForToken) : null;

    return {
      success: true,
      user: createdUser,
      email: normalizedEmail,
      token,
    };
  }

  async verifyEmail(email: string, code: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const normalizedEmail = this.normalizeEmail(email);
    const user = await this.usersService.findByEmail(normalizedEmail);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    // Email verification is disabled. Treat this endpoint as an account activation.
    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        status: 'active',
        emailVerificationCodeHash: null,
        emailVerificationCodeExpiresAt: null,
      },
    });

    return { success: true, user: this.sanitizeUser(updated) };
  }

  async resendVerification(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const normalizedEmail = this.normalizeEmail(email);
    const user = await this.usersService.findByEmail(normalizedEmail);
    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    // Email verification is disabled; nothing to resend.
    // Keep endpoint for frontend compatibility.
    if (!user.emailVerified || user.status !== 'active') {
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          emailVerified: true,
          status: 'active',
          emailVerificationCodeHash: null,
          emailVerificationCodeExpiresAt: null,
        },
      });
    }

    return { success: true };
  }

  async signInWithGoogle(credential: string) {
    if (!credential) {
      throw new BadRequestException('Missing Google credential');
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId) {
      throw new BadRequestException('Google sign-in is not configured');
    }

    let payload;
    try {
      const ticket = await new OAuth2Client(clientId).verifyIdToken({
        idToken: credential,
        audience: clientId,
      });
      payload = ticket.getPayload();
    } catch (error) {
      throw new UnauthorizedException('Invalid Google credential');
    }

    if (!payload || !payload.email) {
      throw new UnauthorizedException('Unable to verify Google account');
    }

    const normalizedEmail = this.normalizeEmail(payload.email);
    const existingUser = await this.usersService.findByEmail(normalizedEmail);
    let userForResponse: any;

    if (!existingUser) {
      const randomPassword = crypto.randomBytes(32).toString('hex');
      userForResponse = await this.usersService.create({
        name: payload.name || payload.email.split('@')[0],
        email: normalizedEmail,
        password: randomPassword,
        role: 'student',
        status: 'active',
        emailVerified: true,
        department: payload.hd || 'Undergraduate',
        avatar: payload.picture || undefined,
      });
    } else {
      const updated = await this.prisma.user.update({
        where: { id: existingUser.id },
        data: {
          status: 'active',
          emailVerified: true,
          emailVerificationCodeHash: null,
          emailVerificationCodeExpiresAt: null,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          studentId: true,
          avatar: true,
          department: true,
          joinedAt: true,
          status: true,
          emailVerified: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      userForResponse = updated;
    }

    const tokenSource = await this.prisma.user.findUnique({
      where: { id: userForResponse.id },
      select: { id: true, email: true, role: true, passwordVersion: true },
    });
    const token = tokenSource ? this.signToken(tokenSource) : null;

    return { success: true, user: this.sanitizeUser(userForResponse), token };
  }

  async forgotPassword(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const normalizedEmail = this.normalizeEmail(email);
    const user = await this.usersService.findByEmail(normalizedEmail);

    if (!user) {
      // Don't reveal if user exists for security, but log it
      await this.auditLogs.create({
        action: 'PASSWORD_RESET_REQUEST_FAILURE',
        actorId: null,
        targetId: null,
        entity: 'user',
        entityId: null,
        message: `Password reset requested for non-existent email: ${normalizedEmail}`,
      });
      return { success: true }; // Return success to prevent email enumeration
    }

    // Generate 6-digit code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const resetCodeHash = await bcrypt.hash(resetCode, 10);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordCodeHash: resetCodeHash,
        resetPasswordCodeExpiresAt: expiresAt,
      },
    });

    await this.auditLogs.create({
      action: 'PASSWORD_RESET_REQUEST_SUCCESS',
      actorId: user.id,
      targetId: user.id,
      entity: 'user',
      entityId: user.id,
      message: `Password reset code generated for ${user.email}`,
    });

    // In a real app, send email here. For now, log to console.
    console.log('-----------------------------------------');
    console.log(`PASSWORD RESET CODE FOR ${user.email}: ${resetCode}`);
    console.log('-----------------------------------------');

    return { success: true };
  }

  async resetPassword(payload: { email: string; newPassword: string }) {
    const { email, newPassword } = payload;

    if (!email || !newPassword) {
      throw new BadRequestException('Missing required fields');
    }

    const normalizedEmail = this.normalizeEmail(email);
    const user = await this.usersService.findByEmail(normalizedEmail);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        passwordVersion: { increment: 1 },
        resetPasswordCodeHash: null,
        resetPasswordCodeExpiresAt: null,
      },
    });

    await this.auditLogs.create({
      action: 'PASSWORD_RESET_SUCCESS',
      actorId: user.id,
      targetId: user.id,
      entity: 'user',
      entityId: user.id,
      message: `Password successfully reset (direct) for ${user.email}`,
    });

    console.log(`✅ PASSWORD RESET SUCCESSFUL FOR: ${user.email}`);
    return { success: true };
  }
}
