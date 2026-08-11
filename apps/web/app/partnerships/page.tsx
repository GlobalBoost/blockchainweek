import type { Metadata } from "next";
import { PartnershipsPageContent } from "@/components/partnerships/PartnershipsPageContent";

export const metadata: Metadata = {
  title: "Partnerships",
  description:
    "Blockchain Week - UNGA Edition 2026 sponsorship opportunities – connect with governments, investors, enterprises, and emerging technologies during UNGA week in New York City.",
};

export default function PartnershipsPage() {
  return <PartnershipsPageContent />;
}
