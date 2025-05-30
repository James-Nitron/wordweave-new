-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dailyWord" JSONB;

-- CreateTable
CREATE TABLE "DailyWord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "translations" TEXT[],
    "language" TEXT NOT NULL,
    "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyWord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WordHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "translations" TEXT[],
    "language" TEXT NOT NULL,
    "seenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WordHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyWord_userId_date_language_key" ON "DailyWord"("userId", "date", "language");

-- CreateIndex
CREATE UNIQUE INDEX "WordHistory_userId_word_language_key" ON "WordHistory"("userId", "word", "language");

-- AddForeignKey
ALTER TABLE "DailyWord" ADD CONSTRAINT "DailyWord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WordHistory" ADD CONSTRAINT "WordHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
