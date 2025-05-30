import { prisma } from "@wordweave/database";
import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import path from "path";
import { clerkWebhookHandler } from "./webhooks/clerk";
import { updateLanguageHandler } from "./routes/users/update-language";
import { getDailyWord } from "./routes/word/daily-word";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import { getUser } from "./routes/users/get-user";

// Load environment variables from root .env.development
dotenv.config({
  path: path.resolve(process.cwd(), "../../.env.development"),
});

const app = express();
const port = process.env.PORT || 3000;

// Test database connection
async function testDbConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
}

testDbConnection();

// Middleware
app.use(cors());
app.use(express.json());

// Apply Clerk middleware to all routes
app.use(clerkMiddleware());

// Add a root route handler
app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

// Webhook endpoint for Clerk
app.post("/api/webhooks/clerk", clerkWebhookHandler);

app.get("/api/users/:userId", requireAuth(), getUser);
app.post("/api/users/:userId/language", requireAuth(), updateLanguageHandler);
app.get("/api/users/:userId/daily-word", requireAuth(), getDailyWord);

// Error handling for unmatched routes
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

// Start server
app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});
