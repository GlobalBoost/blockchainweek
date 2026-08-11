import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visa Invitation Letter",
  description:
    "Request an official invitation letter for visa purposes for Blockchain Week - UNGA Edition 2026 in New York.",
  alternates: { canonical: "/visa-invitation" },
};

export default function VisaInvitationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
