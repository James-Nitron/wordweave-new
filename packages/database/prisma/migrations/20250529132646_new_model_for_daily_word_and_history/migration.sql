/*
  Warnings:

  - You are about to drop the column `dailyWord` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "dailyWord";

-- CreateTable
CREATE TABLE "DailyWord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "translations" TEXT[],
    "language" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyWord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyWord_userId_language_date_key" ON "DailyWord"("userId", "language", "date");

-- AddForeignKey
ALTER TABLE "DailyWord" ADD CONSTRAINT "DailyWord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
