/*
  Warnings:

  - The primary key for the `Language` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "public"."CategoryTranslation" DROP CONSTRAINT "CategoryTranslation_languageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CourseTranslation" DROP CONSTRAINT "CourseTranslation_languageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."LectureTranslation" DROP CONSTRAINT "LectureTranslation_languageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserTranslation" DROP CONSTRAINT "UserTranslation_languageId_fkey";

-- AlterTable
ALTER TABLE "public"."CategoryTranslation" ALTER COLUMN "languageId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."CourseTranslation" ALTER COLUMN "languageId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."Language" DROP CONSTRAINT "Language_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE VARCHAR(15),
ADD CONSTRAINT "Language_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Language_id_seq";

-- AlterTable
ALTER TABLE "public"."LectureTranslation" ALTER COLUMN "languageId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "public"."UserTranslation" ALTER COLUMN "languageId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "public"."UserTranslation" ADD CONSTRAINT "UserTranslation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "public"."Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LectureTranslation" ADD CONSTRAINT "LectureTranslation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "public"."Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CourseTranslation" ADD CONSTRAINT "CourseTranslation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "public"."Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "public"."Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;
