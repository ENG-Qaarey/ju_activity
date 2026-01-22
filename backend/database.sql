-- PostgreSQL schema generated from Prisma schema
-- File: database.sql

-- Enums
CREATE TYPE "UserRole" AS ENUM ('student', 'coordinator', 'admin');
CREATE TYPE "UserStatus" AS ENUM ('active', 'inactive');
CREATE TYPE "ActivityCategory" AS ENUM ('workshop', 'seminar', 'training', 'extracurricular');
CREATE TYPE "ActivityStatus" AS ENUM ('upcoming', 'ongoing', 'completed');
CREATE TYPE "ApplicationStatus" AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE "NotificationType" AS ENUM ('approval', 'rejection', 'announcement', 'reminder');
CREATE TYPE "AttendanceStatus" AS ENUM ('present', 'absent');
CREATE TYPE "AuditAction" AS ENUM (
  'LOGIN_SUCCESS', 'LOGIN_FAILURE', 'USER_CREATE', 'USER_UPDATE', 'USER_DELETE', 'USER_STATUS_TOGGLE',
  'USER_ROLE_CHANGE', 'ACTIVITY_CREATE', 'ACTIVITY_UPDATE', 'ACTIVITY_DELETE', 'APPLICATION_CREATE',
  'APPLICATION_STATUS_UPDATE', 'APPLICATION_DELETE', 'ATTENDANCE_MARK', 'NOTIFICATION_CREATE', 'NOTIFICATION_MARK_READ'
);

-- Tables
CREATE TABLE "users" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role "UserRole" NOT NULL,
  studentId TEXT,
  avatar TEXT,
  department TEXT,
  joinedAt DATE,
  status "UserStatus" NOT NULL DEFAULT 'active',
  emailVerified BOOLEAN NOT NULL DEFAULT FALSE,
  emailVerificationCodeHash TEXT,
  emailVerificationCodeExpiresAt TIMESTAMP,
  passwordHash TEXT NOT NULL,
  passwordVersion INT NOT NULL DEFAULT 0,
  createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT users_email_idx UNIQUE (email)
);
CREATE INDEX users_role_idx ON "users" (role);
CREATE INDEX users_status_idx ON "users" (status);

CREATE TABLE "admins" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId UUID UNIQUE NOT NULL,
  permissions TEXT NOT NULL,
  accessLevel TEXT NOT NULL DEFAULT 'full',
  lastLogin TIMESTAMP,
  createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT admins_userid_fkey FOREIGN KEY (userId) REFERENCES "users"(id) ON DELETE CASCADE
);

CREATE TABLE "coordinators" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  userId UUID UNIQUE NOT NULL,
  department TEXT,
  specialization TEXT,
  maxActivities INT NOT NULL DEFAULT 10,
  approvalLevel TEXT NOT NULL DEFAULT 'standard',
  createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT coordinators_userid_fkey FOREIGN KEY (userId) REFERENCES "users"(id) ON DELETE CASCADE
);
CREATE INDEX coordinators_userid_idx ON "coordinators" (userId);
CREATE INDEX coordinators_department_idx ON "coordinators" (department);

CREATE TABLE "activities" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category "ActivityCategory" NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  location TEXT NOT NULL,
  capacity INT NOT NULL,
  enrolled INT NOT NULL DEFAULT 0,
  coordinatorId UUID,
  status "ActivityStatus" NOT NULL DEFAULT 'upcoming',
  createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT activities_coordinatorid_fkey FOREIGN KEY (coordinatorId) REFERENCES "users"(id) ON DELETE SET NULL
);
CREATE INDEX activities_coordinatorid_idx ON "activities" (coordinatorId);
CREATE INDEX activities_status_idx ON "activities" (status);
CREATE INDEX activities_date_idx ON "activities" (date);
CREATE INDEX activities_category_idx ON "activities" (category);

CREATE TABLE "applications" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studentId UUID NOT NULL,
  studentName TEXT NOT NULL,
  activityId UUID NOT NULL,
  activityTitle TEXT NOT NULL,
  appliedAt DATE NOT NULL,
  status "ApplicationStatus" NOT NULL DEFAULT 'pending',
  notes TEXT,
  createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT applications_studentid_fkey FOREIGN KEY (studentId) REFERENCES "users"(id) ON DELETE CASCADE,
  CONSTRAINT applications_activityid_fkey FOREIGN KEY (activityId) REFERENCES "activities"(id) ON DELETE CASCADE,
  CONSTRAINT applications_unique_student_activity UNIQUE (studentId, activityId)
);
CREATE INDEX applications_studentid_idx ON "applications" (studentId);
CREATE INDEX applications_activityid_idx ON "applications" (activityId);
CREATE INDEX applications_status_idx ON "applications" (status);
CREATE INDEX applications_appliedat_idx ON "applications" (appliedAt);
CREATE INDEX applications_activityid_status_studentname_idx ON "applications" (activityId, status, studentName);

CREATE TABLE "notifications" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type "NotificationType" NOT NULL,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  senderRole "UserRole",
  recipientId UUID NOT NULL,
  CONSTRAINT notifications_recipientid_fkey FOREIGN KEY (recipientId) REFERENCES "users"(id) ON DELETE CASCADE
);
CREATE INDEX notifications_read_idx ON "notifications" (read);
CREATE INDEX notifications_createdat_idx ON "notifications" (createdAt);
CREATE INDEX notifications_recipientid_idx ON "notifications" (recipientId);
CREATE INDEX notifications_type_idx ON "notifications" (type);

CREATE TABLE "attendance" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activityId UUID NOT NULL,
  studentId UUID NOT NULL,
  studentName TEXT NOT NULL,
  applicationId UUID UNIQUE NOT NULL,
  status "AttendanceStatus" NOT NULL,
  markedAt DATE NOT NULL,
  markedBy UUID,
  createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT attendance_activityid_fkey FOREIGN KEY (activityId) REFERENCES "activities"(id) ON DELETE CASCADE,
  CONSTRAINT attendance_studentid_fkey FOREIGN KEY (studentId) REFERENCES "users"(id) ON DELETE CASCADE,
  CONSTRAINT attendance_applicationid_fkey FOREIGN KEY (applicationId) REFERENCES "applications"(id) ON DELETE CASCADE,
  CONSTRAINT attendance_markedby_fkey FOREIGN KEY (markedBy) REFERENCES "users"(id) ON DELETE SET NULL,
  CONSTRAINT attendance_unique_activity_student UNIQUE (activityId, studentId)
);
CREATE INDEX attendance_activityid_idx ON "attendance" (activityId);
CREATE INDEX attendance_studentid_idx ON "attendance" (studentId);
CREATE INDEX attendance_status_idx ON "attendance" (status);
CREATE INDEX attendance_markedat_idx ON "attendance" (markedAt);

CREATE TABLE "audit_logs" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action "AuditAction" NOT NULL,
  actorId UUID,
  targetId UUID,
  entity TEXT,
  entityId TEXT,
  message TEXT,
  metadata JSONB,
  createdAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  CONSTRAINT auditlogs_actorid_fkey FOREIGN KEY (actorId) REFERENCES "users"(id) ON DELETE SET NULL,
  CONSTRAINT auditlogs_targetid_fkey FOREIGN KEY (targetId) REFERENCES "users"(id) ON DELETE SET NULL
);
CREATE INDEX auditlogs_action_idx ON "audit_logs" (action);
CREATE INDEX auditlogs_createdat_idx ON "audit_logs" (createdAt);
CREATE INDEX auditlogs_actorid_idx ON "audit_logs" (actorId);
CREATE INDEX auditlogs_targetid_idx ON "audit_logs" (targetId);
CREATE INDEX auditlogs_entity_entityid_idx ON "audit_logs" (entity, entityId);
