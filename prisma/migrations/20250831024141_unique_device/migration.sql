/*
  Warnings:

  - A unique constraint covering the columns `[userId,deviceName,deviceType]` on the table `Device` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Device_userId_deviceName_deviceType_key" ON "public"."Device"("userId", "deviceName", "deviceType");
