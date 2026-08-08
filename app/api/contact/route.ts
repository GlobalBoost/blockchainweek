import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { CONTACT_EMAIL } from "@/lib/brand-constants";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = schema.parse(await request.json());
    console.log("Contact form submission:", { to: CONTACT_EMAIL, ...body });

    if (process.env.RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "UN Blockchain Week <noreply@unblockchainweek.com>",
          to: CONTACT_EMAIL,
          subject: `Contact from ${body.name}`,
          text: `From: ${body.name} (${body.email})\n\n${body.message}`,
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }
}
