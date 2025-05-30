import { PrismaClient } from "@prisma/client";

// Export our custom types
export type { User, DailyWord, History, Plan } from "./types";

// Export Prisma client instance
export const prisma = new PrismaClient();
