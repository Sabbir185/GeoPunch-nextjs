-- AlterTable
ALTER TABLE "Otp" ADD COLUMN     "action" TEXT,
ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '5 minutes';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "fcm_token" TEXT,
ADD COLUMN     "position" JSONB;
