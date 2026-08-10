import { CONTACT_EMAIL } from "@/lib/brand-constants";

type SendFormEmailInput = {
  to?: string;
  subject: string;
  text: string;
  replyTo?: string;
};

export async function sendFormEmail({
  to = CONTACT_EMAIL,
  subject,
  text,
  replyTo,
}: SendFormEmailInput): Promise<void> {
  if (!process.env.RESEND_API_KEY) return;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "UN Blockchain Week <noreply@unblockchainweek.com>",
      to,
      subject,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
}
