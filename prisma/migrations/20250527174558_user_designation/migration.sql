-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '5 minutes';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "designation" TEXT,
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
