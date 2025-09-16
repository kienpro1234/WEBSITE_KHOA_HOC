/*
  Warnings:

  - You are about to drop the column `userId` on the `Device` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[deviceFingerprint]` on the table `Device` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Device" DROP CONSTRAINT "Device_userId_fkey";

-- DropIndex
DROP INDEX "public"."Device_deviceFingerprint_idx";

-- DropIndex
DROP INDEX "public"."Device_deviceFingerprint_userId_key";

-- AlterTable
ALTER TABLE "public"."Device" DROP COLUMN "userId";

-- CreateTable
CREATE TABLE "public"."_DeviceToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DeviceToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DeviceToUser_B_index" ON "public"."_DeviceToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Device_deviceFingerprint_key" ON "public"."Device"("deviceFingerprint");

-- AddForeignKey
ALTER TABLE "public"."_DeviceToUser" ADD CONSTRAINT "_DeviceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_DeviceToUser" ADD CONSTRAINT "_DeviceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
