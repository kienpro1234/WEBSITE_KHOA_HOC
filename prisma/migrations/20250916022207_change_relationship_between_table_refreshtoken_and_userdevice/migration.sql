-- DropForeignKey
ALTER TABLE "public"."RefreshToken" DROP CONSTRAINT "RefreshToken_deviceId_fkey";

-- AddForeignKey
ALTER TABLE "public"."RefreshToken" ADD CONSTRAINT "RefreshToken_userId_deviceId_fkey" FOREIGN KEY ("userId", "deviceId") REFERENCES "public"."UserDevice"("userId", "deviceId") ON DELETE CASCADE ON UPDATE CASCADE;
