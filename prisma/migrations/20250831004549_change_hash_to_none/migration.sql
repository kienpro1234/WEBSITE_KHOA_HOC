/*
  Warnings:

  - You are about to drop the column `tokenHash` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - Added the required column `token` to the `RefreshToken` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."RefreshToken" DROP COLUMN "tokenHash",
ADD COLUMN     "token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "passwordHash",
ADD COLUMN     "password" TEXT NOT NULL;
