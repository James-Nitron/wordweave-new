import { Request, Response } from "express";
import { prisma } from "@wordweave/database";
import { spanishWords } from "../../data/word-lists/es";

const wordLists = {
  es: spanishWords,
};

export async function getDailyWord(req: Request, res: Response) {
  const { userId } = req.params;
  const { language } = req.query;

  if (!userId || !language) {
    return res.status(400).json({ error: "User ID and language are required" });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    // Try to get existing user with daily word
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        dailyWord: true,
        history: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If daily word exists for today and it's for the same language, return user
    if (
      user.dailyWord &&
      user.dailyWord.language === language &&
      user.dailyWord.date >= today &&
      user.dailyWord.date < new Date(today.getTime() + 24 * 60 * 60 * 1000)
    ) {
      return res.json(user);
    }

    // Get word list for the language
    const wordList = wordLists[language as keyof typeof wordLists];
    if (!wordList) {
      return res.status(400).json({ error: "Language not supported" });
    }

    // Get words that haven't been used before
    const usedWordsSet = new Set(
      user.history.filter((h) => h.language === language).map((h) => h.word)
    );

    // Get available words
    const availableWords = Object.entries(wordList).filter(
      ([word]) => !usedWordsSet.has(word)
    );

    if (availableWords.length === 0) {
      return res.status(404).json({ error: "No more words available" });
    }

    // Select a random word
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const [word, translations] = availableWords[randomIndex];

    // Create new daily word and word history, then return updated user
    const updatedUser = await prisma.$transaction(async (tx) => {
      // Add to history
      await tx.history.create({
        data: {
          userId,
          word,
          translations,
          language: language as string,
        },
      });

      // Create or update daily word
      await tx.dailyWord.upsert({
        where: {
          userId,
        },
        create: {
          userId,
          word,
          translations,
          language: language as string,
          date: today,
        },
        update: {
          word,
          translations,
          language: language as string,
          date: today,
        },
      });

      // Return updated user with relations
      return tx.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          dailyWord: true,
          history: true,
        },
      });
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Error getting daily word:", error);
    res.status(500).json({ error: "Failed to get daily word" });
  }
}
