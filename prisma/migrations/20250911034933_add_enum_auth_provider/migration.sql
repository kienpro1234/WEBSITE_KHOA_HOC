/*
  Warnings:

  - Changed the type of `provider` on the `UserAuthProvider` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."AuthProvider" AS ENUM ('LOCAL', 'GOOGLE', 'FACEBOOK');

-- AlterTable
ALTER TABLE "public"."UserAuthProvider" DROP COLUMN "provider",
ADD COLUMN     "provider" "public"."AuthProvider" NOT NULL;

-- CreateIndex
CREATE INDEX "UserAuthProvider_userId_provider_idx" ON "public"."UserAuthProvider"("userId", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "UserAuthProvider_provider_providerUserId_key" ON "public"."UserAuthProvider"("provider", "providerUserId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAuthProvider_emailFromProvider_provider_key" ON "public"."UserAuthProvider"("emailFromProvider", "provider");
