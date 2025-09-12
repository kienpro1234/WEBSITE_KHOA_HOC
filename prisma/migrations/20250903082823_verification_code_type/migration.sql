/*
  Warnings:

  - The values [EMAIL_VERIFICATION,PASSWORD_RESET] on the enum `VerificationCodeType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."VerificationCodeType_new" AS ENUM ('REGISTER', 'FORGET_PASSWORD');
ALTER TABLE "public"."VerificationCode" ALTER COLUMN "type" TYPE "public"."VerificationCodeType_new" USING ("type"::text::"public"."VerificationCodeType_new");
ALTER TYPE "public"."VerificationCodeType" RENAME TO "VerificationCodeType_old";
ALTER TYPE "public"."VerificationCodeType_new" RENAME TO "VerificationCodeType";
DROP TYPE "public"."VerificationCodeType_old";
COMMIT;
