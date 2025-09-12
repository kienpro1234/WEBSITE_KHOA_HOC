-- CreateIndex
CREATE INDEX "UserAuthProvider_emailFromProvider_provider_idx" ON "public"."UserAuthProvider"("emailFromProvider", "provider");
