-- CreateTable
CREATE TABLE "public"."UserDevice" (
    "userId" INTEGER NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),

    CONSTRAINT "UserDevice_pkey" PRIMARY KEY ("userId","deviceId")
);
