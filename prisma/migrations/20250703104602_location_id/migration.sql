/*
  Warnings:

  - A unique constraint covering the columns `[locationId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Otp" ALTER COLUMN "expiresAt" SET DEFAULT NOW() + INTERVAL '5 minutes';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "locationId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_locationId_key" ON "User"("locationId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;
