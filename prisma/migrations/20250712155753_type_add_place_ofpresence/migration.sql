-- AlterTable
ALTER TABLE "CurrentPlace" ADD COLUMN     "type" TEXT;

-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '5 minutes';
