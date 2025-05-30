import { Request, Response } from "express";
import { prisma } from "@wordweave/database";

export async function updateColor(req: Request, res: Response) {
  const { userId } = req.params;
  const { color } = req.body;

  if (!color) {
    return res.status(400).json({ error: "Color is required" });
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { color },
      include: {
        dailyWord: true,
        history: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.error("Error updating user color:", error);
    res.status(500).json({ error: "Failed to update color" });
  }
}
