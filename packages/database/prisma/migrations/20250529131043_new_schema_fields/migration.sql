/*
  Warnings:

  - You are about to drop the column `history` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `DailyWord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WordHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DailyWord" DROP CONSTRAINT "DailyWord_userId_fkey";

-- DropForeignKey
ALTER TABLE "WordHistory" DROP CONSTRAINT "WordHistory_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "history";

-- DropTable
DROP TABLE "DailyWord";

-- DropTable
DROP TABLE "WordHistory";

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "translations" TEXT[],
    "language" TEXT NOT NULL,
    "seenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "History_userId_word_language_key" ON "History"("userId", "word", "language");

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
