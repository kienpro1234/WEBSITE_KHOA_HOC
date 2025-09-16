/*
  Warnings:

  - A unique constraint covering the columns `[deviceFingerprint,userId]` on the table `Device` will be added. If there are existing duplicate values, this will fail.
  - Made the column `deviceFingerprint` on table `Device` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."Device_deviceFingerprint_key";

-- DropIndex
DROP INDEX "public"."Device_userId_deviceName_deviceType_key";

-- AlterTable
ALTER TABLE "public"."Device" ALTER COLUMN "deviceFingerprint" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Device_deviceFingerprint_idx" ON "public"."Device"("deviceFingerprint");

-- CreateIndex
CREATE UNIQUE INDEX "Device_deviceFingerprint_userId_key" ON "public"."Device"("deviceFingerprint", "userId");
