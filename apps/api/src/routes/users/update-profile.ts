import { Request, Response } from "express";
import { prisma } from "@wordweave/database";

export async function updateProfile(req: Request, res: Response) {
  const { userId } = req.params;
  const { language, color } = req.body;

  if (!language || !color) {
    return res.status(400).json({ error: "Language and color are required" });
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        languages: [language],
        selectedLanguage: language,
        isNewUser: false, // Update isNewUser since they've set their language
        color: color,
      },
      include: {
        dailyWord: true,
        history: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
}
