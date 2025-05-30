import { Request, Response } from "express";
import { Webhook } from "svix";
import { prisma } from "@wordweave/database";

interface EmailAddress {
  email_address: string;
  id: string;
  linked_to: any[];
  object: "email_address";
  verification: unknown;
}

interface ClerkUser {
  id: string;
  object: "user";
  external_id: string;
  first_name: string;
  last_name: string;
  email_addresses: EmailAddress[];
  primary_email_address_id: string;
  created_at: number;
  updated_at: number;
  image_url: string;
  profile_image_url: string;
  username: string | null;
  password_enabled: boolean;
  two_factor_enabled: boolean;
  public_metadata: Record<string, unknown>;
  private_metadata: Record<string, unknown>;
  unsafe_metadata: Record<string, unknown>;
}

interface ClerkWebhookEvent {
  type: string;
  data: ClerkUser;
  object: string;
}

export async function clerkWebhookHandler(req: Request, res: Response) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SECRET");
    return res.status(500).json({ error: "Server misconfigured" });
  }

  // Verify webhook signature
  const payload = JSON.stringify(req.body);
  const headerSignature = req.headers["svix-signature"] as string;
  const headerTimestamp = req.headers["svix-timestamp"] as string;
  const headerId = req.headers["svix-id"] as string;

  if (!headerSignature || !headerTimestamp || !headerId) {
    return res.status(400).json({ error: "Missing webhook headers" });
  }

  try {
    const wh = new Webhook(WEBHOOK_SECRET);
    const evt = wh.verify(payload, {
      "svix-id": headerId,
      "svix-timestamp": headerTimestamp,
      "svix-signature": headerSignature,
    }) as ClerkWebhookEvent;

    const { type, data } = evt;

    console.log("Webhook received:", { type, data });

    switch (type) {
      case "user.created": {
        console.log("Creating user:", {
          id: data.id,
          email: data.email_addresses[0]?.email_address,
          name: `${data.first_name} ${data.last_name}`.trim(),
        });

        await prisma.user.create({
          data: {
            id: data.id,
          },
        });
        break;
      }

      case "user.deleted": {
        console.log("Deleting user:", data.id);
        await prisma.user.delete({
          where: { id: data.id },
        });
        break;
      }

      default:
        console.log("Unhandled webhook type:", type);
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(400).json({ error: "Webhook verification failed" });
  }
}
