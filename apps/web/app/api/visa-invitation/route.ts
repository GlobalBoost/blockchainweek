import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { CONTACT_EMAIL } from "@/lib/brand-constants";
import { sendFormEmail } from "@/lib/send-form-email";

const schema = z.object({
  contactFullName: z.string().min(1),
  contactEmail: z.string().email(),
  contactPhone: z.string().min(1),
  contactOrganization: z.string().optional(),
  attendeeFullName: z.string().min(1),
  dateOfBirth: z.string().min(1),
  placeOfBirth: z.string().min(1),
  nationality: z.string().min(1),
  passportNumber: z.string().min(1),
  passportCountry: z.string().min(1),
  passportIssueDate: z.string().min(1),
  passportExpiryDate: z.string().min(1),
  residentialAddress: z.string().min(1),
  jobTitle: z.string().min(1),
  organization: z.string().min(1),
  orgAddress: z.string().optional(),
  arrivalDate: z.string().min(1),
  departureDate: z.string().min(1),
  registrationNumber: z.string().min(1),
  ticketType: z.string().optional(),
  embassy: z.string().optional(),
  additionalNotes: z.string().optional(),
  confirmation: z.literal(true).or(z.literal("true")).or(z.literal("on")),
});

function formatBody(body: z.infer<typeof schema>): string {
  return [
    "VISA INVITATION LETTER REQUEST",
    "Blockchain Week - UNGA Edition 2026",
    "",
    "— Primary Contact —",
    `Full Name: ${body.contactFullName}`,
    `Email: ${body.contactEmail}`,
    `Phone: ${body.contactPhone}`,
    `Organization: ${body.contactOrganization || "—"}`,
    "",
    "— Attendee Passport & Personal Details —",
    `Legal Name: ${body.attendeeFullName}`,
    `Date of Birth: ${body.dateOfBirth}`,
    `Place of Birth: ${body.placeOfBirth}`,
    `Nationality: ${body.nationality}`,
    `Passport Number: ${body.passportNumber}`,
    `Passport Issuing Country: ${body.passportCountry}`,
    `Passport Issue Date: ${body.passportIssueDate}`,
    `Passport Expiry Date: ${body.passportExpiryDate}`,
    `Residential Address: ${body.residentialAddress}`,
    "",
    "— Professional / Affiliation —",
    `Job Title: ${body.jobTitle}`,
    `Organization: ${body.organization}`,
    `Organization Address: ${body.orgAddress || "—"}`,
    "",
    "— Travel & Conference —",
    `Arrival Date: ${body.arrivalDate}`,
    `Departure Date: ${body.departureDate}`,
    `Registration / Ticket #: ${body.registrationNumber}`,
    `Ticket Type: ${body.ticketType || "—"}`,
    `Embassy / Consulate: ${body.embassy || "—"}`,
    "",
    "— Additional Notes —",
    body.additionalNotes || "—",
  ].join("\n");
}

export async function POST(request: NextRequest) {
  try {
    const body = schema.parse(await request.json());
    console.log("Visa invitation request:", {
      to: CONTACT_EMAIL,
      attendee: body.attendeeFullName,
      email: body.contactEmail,
    });

    await sendFormEmail({
      to: CONTACT_EMAIL,
      subject: `Visa Invitation Request — ${body.attendeeFullName}`,
      text: formatBody(body),
      replyTo: body.contactEmail,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Visa invitation form error:", error);
    return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  }
}
