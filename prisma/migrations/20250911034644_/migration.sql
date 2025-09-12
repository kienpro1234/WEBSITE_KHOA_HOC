/*
  Warnings:

  - A unique constraint covering the columns `[emailFromProvider,provider]` on the table `UserAuthProvider` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."UserAuthProvider_emailFromProvider_provider_idx";

-- CreateIndex
CREATE UNIQUE INDEX "UserAuthProvider_emailFromProvider_provider_key" ON "public"."UserAuthProvider"("emailFromProvider", "provider");
