import { Request, Response } from "express";
import { prisma } from "@wordweave/database";

export async function getUser(req: Request, res: Response) {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        history: {
          orderBy: {
            seenAt: "desc",
          },
        },
        dailyWord: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
}
