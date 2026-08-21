import type { Metadata } from "next";
import { PartnershipsPageContent } from "@/components/partnerships/PartnershipsPageContent";
import { BRAND_NAME } from "@/lib/brand-constants";

export const metadata: Metadata = {
  title: "Partnerships",
  description: `${BRAND_NAME} 2026 partnership packages — Times Square marquee placement, exhibition, speaking, and event access for crypto and community-driven projects during UNGA week.`,
};

export default function PartnershipsPage() {
  return <PartnershipsPageContent />;
}
