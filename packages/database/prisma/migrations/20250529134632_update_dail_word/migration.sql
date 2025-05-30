/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `DailyWord` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "DailyWord_userId_language_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "DailyWord_userId_key" ON "DailyWord"("userId");
