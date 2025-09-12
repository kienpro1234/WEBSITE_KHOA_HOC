/*
  Warnings:

  - Added the required column `module` to the `Permission` table without a default value. This is not possible if the table is not empty.
  - Made the column `method` on table `Permission` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Permission" ADD COLUMN     "deletedById" INTEGER,
ADD COLUMN     "module" VARCHAR(1000) NOT NULL,
ALTER COLUMN "method" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Permission" ADD CONSTRAINT "Permission_deletedById_fkey" FOREIGN KEY ("deletedById") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
