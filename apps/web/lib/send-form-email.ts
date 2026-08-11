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
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  // Optional local override for testing (e.g. FORM_EMAIL_OVERRIDE=you@example.com)
  const recipient = process.env.FORM_EMAIL_OVERRIDE?.trim() || to;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Blockchain Week - UNGA Edition <noreply@unblockchainweek.com>",
      to: recipient,
      subject,
      text,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend failed (${response.status}): ${detail}`);
  }
}
