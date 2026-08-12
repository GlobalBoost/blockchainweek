import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { SPONSORSHIP_EMAIL } from "@/lib/brand-constants";
import { sendFormEmail } from "@/lib/send-form-email";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  company: z.string().optional(),
  tier: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = schema.parse(await request.json());
    console.log("Partnership inquiry:", { to: SPONSORSHIP_EMAIL, ...body });

    await sendFormEmail({
      to: SPONSORSHIP_EMAIL,
      subject: `Partnership Inquiry: ${body.company || body.name}`,
      text: `Name: ${body.name}\nEmail: ${body.email}\nPhone: ${body.phone}\nCompany: ${body.company ?? ""}\nTier: ${body.tier ?? ""}\n\n${body.message ?? ""}`,
      replyTo: body.email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Partnership form error:", error);
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }
}
