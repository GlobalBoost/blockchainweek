import type { Metadata } from "next";
import { PartnershipsPageContent } from "@/components/partnerships/PartnershipsPageContent";
import { BRAND_NAME } from "@/lib/brand-constants";

export const metadata: Metadata = {
  title: "Partnerships",
  description: `${BRAND_NAME} 2026 sponsorship opportunities – connect with governments, investors, enterprises, and emerging technologies during UNGA week in New York City.`,
};

export default function PartnershipsPage() {
  return <PartnershipsPageContent />;
}
