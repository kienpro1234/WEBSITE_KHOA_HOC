/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `UserAuthProvider` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserAuthProvider_userId_key" ON "public"."UserAuthProvider"("userId");
