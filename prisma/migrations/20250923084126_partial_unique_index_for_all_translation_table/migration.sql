-- DropIndex
DROP INDEX "public"."CategoryTranslation_categoryId_languageId_key";

-- DropIndex
DROP INDEX "public"."CourseTranslation_courseId_languageId_key";

-- DropIndex
DROP INDEX "public"."LectureTranslation_lectureId_languageId_key";

-- DropIndex
DROP INDEX "public"."UserTranslation_userId_languageId_key";

CREATE UNIQUE INDEX "CategoryTranslation_categoryId_languageId_unique"
ON "CategoryTranslation" ("categoryId", "languageId")
WHERE "deletedAt" IS NULL;

CREATE UNIQUE INDEX "CourseTranslation_courseId_languageId_unique"
ON "CourseTranslation" ("courseId", "languageId")
WHERE "deletedAt" IS NULL;

CREATE UNIQUE INDEX "LectureTranslation_lectureId_languageId_unique"
ON "LectureTranslation" ("lectureId", "languageId")
WHERE "deletedAt" IS NULL;

CREATE UNIQUE INDEX "UserTranslation_userId_languageId_key_unique"
ON "UserTranslation" ("userId", "languageId")
WHERE "deletedAt" IS NULL;
