/*
  Warnings:

  - You are about to drop the `CourseTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."CourseTag" DROP CONSTRAINT "CourseTag_courseId_fkey";

-- DropForeignKey
ALTER TABLE "public"."CourseTag" DROP CONSTRAINT "CourseTag_tagId_fkey";

-- DropTable
DROP TABLE "public"."CourseTag";

-- CreateTable
CREATE TABLE "public"."_CourseToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CourseToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CourseToTag_B_index" ON "public"."_CourseToTag"("B");

-- AddForeignKey
ALTER TABLE "public"."_CourseToTag" ADD CONSTRAINT "_CourseToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_CourseToTag" ADD CONSTRAINT "_CourseToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
