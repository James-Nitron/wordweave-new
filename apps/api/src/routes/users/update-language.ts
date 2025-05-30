import { Request, Response } from "express";
import { prisma } from "@wordweave/database";

export async function updateLanguageHandler(req: Request, res: Response) {
  const { userId } = req.params;
  const { language } = req.body;

  if (!language) {
    return res.status(400).json({ error: "Language is required" });
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        languages: [language],
        selectedLanguage: language,
        isNewUser: false, // Update isNewUser since they've set their language
      },
    });
    res.json(user);
  } catch (error) {
    console.error("Error updating user language:", error);
    res.status(500).json({ error: "Failed to update language" });
  }
}
