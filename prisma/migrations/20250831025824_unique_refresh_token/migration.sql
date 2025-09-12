/*
  Warnings:

  - A unique constraint covering the columns `[userId,deviceId]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_userId_deviceId_key" ON "public"."RefreshToken"("userId", "deviceId");
