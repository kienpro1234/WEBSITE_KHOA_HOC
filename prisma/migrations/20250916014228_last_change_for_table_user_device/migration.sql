/*
  Warnings:

  - You are about to drop the `_DeviceToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_DeviceToUser" DROP CONSTRAINT "_DeviceToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_DeviceToUser" DROP CONSTRAINT "_DeviceToUser_B_fkey";

-- DropTable
DROP TABLE "public"."_DeviceToUser";

-- AddForeignKey
ALTER TABLE "public"."UserDevice" ADD CONSTRAINT "UserDevice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserDevice" ADD CONSTRAINT "UserDevice_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "public"."Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;
