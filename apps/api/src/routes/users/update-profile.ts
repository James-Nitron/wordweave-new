import { Request, Response } from "express";
import { prisma } from "@wordweave/database";
import { getDailyWord } from "../word/daily-word";

export async function updateProfile(req: Request, res: Response) {
  const { userId } = req.params;
  const { language, color } = req.body;

  if (!language || !color) {
    return res.status(400).json({ error: "Language and color are required" });
  }

  try {
    // First update the user profile
    await prisma.user.update({
      where: { id: userId },
      data: {
        languages: [language],
        selectedLanguage: language,
        isNewUser: false,
        color: color,
      },
    });

    // Then get/create daily word using the existing endpoint
    req.query.language = language;
    return getDailyWord(req, res);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
}
