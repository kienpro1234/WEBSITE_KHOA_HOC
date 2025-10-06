-- AlterTable
ALTER TABLE "public"."CategoryTranslation" ADD COLUMN     "deletedById" INTEGER;

-- AlterTable
ALTER TABLE "public"."CourseTranslation" ADD COLUMN     "deletedById" INTEGER;

-- AlterTable
ALTER TABLE "public"."Language" ADD COLUMN     "deletedById" INTEGER;

-- AlterTable
ALTER TABLE "public"."LectureTranslation" ADD COLUMN     "deletedById" INTEGER;

-- AlterTable
ALTER TABLE "public"."UserTranslation" ADD COLUMN     "deletedById" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."Language" ADD CONSTRAINT "Language_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserTranslation" ADD CONSTRAINT "UserTranslation_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LectureTranslation" ADD CONSTRAINT "LectureTranslation_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CourseTranslation" ADD CONSTRAINT "CourseTranslation_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CategoryTranslation" ADD CONSTRAINT "CategoryTranslation_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
