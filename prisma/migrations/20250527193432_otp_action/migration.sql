/*
  Warnings:

  - Made the column `action` on table `Otp` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '5 minutes',
ALTER COLUMN "action" SET NOT NULL;
