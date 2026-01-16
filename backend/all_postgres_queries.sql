-- JU_ACTIVITY_HUB: All PostgreSQL SQL Queries
-- Generated January 16, 2026

-- ENUMS
CREATE TYPE "UserRole" AS ENUM ('student', 'coordinator', 'admin');
CREATE TYPE "UserStatus" AS ENUM ('active', 'inactive');
CREATE TYPE "ActivityCategory" AS ENUM ('workshop', 'seminar', 'training', 'extracurricular');
CREATE TYPE "ActivityStatus" AS ENUM ('upcoming', 'ongoing', 'completed');
CREATE TYPE "ApplicationStatus" AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE "NotificationType" AS ENUM ('approval', 'rejection', 'announcement', 'reminder');
CREATE TYPE "AttendanceStatus" AS ENUM ('present', 'absent');
CREATE TYPE "AuditAction" AS ENUM (
  'LOGIN_SUCCESS', 'LOGIN_FAILURE', 'USER_CREATE', 'USER_UPDATE', 'USER_DELETE', 'USER_STATUS_TOGGLE', 'USER_ROLE_CHANGE',
  'ACTIVITY_CREATE', 'ACTIVITY_UPDATE', 'ACTIVITY_DELETE', 'APPLICATION_CREATE', 'APPLICATION_STATUS_UPDATE', 'APPLICATION_DELETE',
  'ATTENDANCE_MARK', 'NOTIFICATION_CREATE', 'NOTIFICATION_MARK_READ'
);

-- TABLES
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "studentId" TEXT,
    "avatar" TEXT,
    "department" TEXT,
    "joinedAt" DATE,
    "status" "UserStatus" NOT NULL DEFAULT 'active',
    "passwordHash" TEXT NOT NULL,
    "passwordVersion" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "emailVerificationCodeExpiresAt" TIMESTAMP(3),
    "emailVerificationCodeHash" TEXT,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "activities" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "ActivityCategory" NOT NULL,
    "date" DATE NOT NULL,
    "time" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "enrolled" INTEGER NOT NULL DEFAULT 0,
    "coordinatorId" TEXT NOT NULL,
    "coordinatorName" TEXT NOT NULL,
    "status" "ActivityStatus" NOT NULL DEFAULT 'upcoming',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "activityTitle" TEXT NOT NULL,
    "appliedAt" DATE NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATE NOT NULL,
    "senderRole" "UserRole",
    "recipientId" TEXT NOT NULL,
    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "attendance" (
    "id" TEXT NOT NULL,
    "activityId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "status" "AttendanceStatus" NOT NULL,
    "markedAt" DATE NOT NULL,
    "markedBy" TEXT NOT NULL,
    CONSTRAINT "attendance_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "permissions" TEXT NOT NULL,
    "accessLevel" TEXT NOT NULL DEFAULT 'full',
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "coordinators" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "department" TEXT,
    "specialization" TEXT,
    "maxActivities" INTEGER NOT NULL DEFAULT 10,
    "approvalLevel" TEXT NOT NULL DEFAULT 'standard',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "coordinators_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "action" "AuditAction" NOT NULL,
    "actorId" TEXT,
    "targetId" TEXT,
    "entity" TEXT,
    "entityId" TEXT,
    "message" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- INDEXES
CREATE UNIQUE INDEX "admins_userId_key" ON "admins"("userId");
CREATE UNIQUE INDEX "coordinators_userId_key" ON "coordinators"("userId");
CREATE INDEX "coordinators_userId_idx" ON "coordinators"("userId");
CREATE INDEX "coordinators_department_idx" ON "coordinators"("department");
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");
CREATE INDEX "audit_logs_createdAt_idx" ON "audit_logs"("createdAt");
CREATE INDEX "audit_logs_actorId_idx" ON "audit_logs"("actorId");
CREATE INDEX "audit_logs_targetId_idx" ON "audit_logs"("targetId");
CREATE INDEX "audit_logs_entity_entityId_idx" ON "audit_logs"("entity", "entityId");
CREATE INDEX "applications_activityId_status_studentName_idx" ON "applications"("activityId", "status", "studentName");

-- FOREIGN KEYS
ALTER TABLE "admins" ADD CONSTRAINT "admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "coordinators" ADD CONSTRAINT "coordinators_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
