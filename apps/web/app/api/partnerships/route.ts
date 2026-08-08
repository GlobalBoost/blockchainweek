import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { SPONSORSHIP_EMAIL } from "@/lib/brand-constants";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().optional(),
  tier: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = schema.parse(await request.json());
    console.log("Partnership inquiry:", { to: SPONSORSHIP_EMAIL, ...body });

    if (process.env.RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "UN Blockchain Week <noreply@unblockchainweek.com>",
          to: SPONSORSHIP_EMAIL,
          subject: `Partnership Inquiry: ${body.company || body.name}`,
          text: `Name: ${body.name}\nEmail: ${body.email}\nCompany: ${body.company}\nTier: ${body.tier}\n\n${body.message}`,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Partnership form error:", error);
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }
}
