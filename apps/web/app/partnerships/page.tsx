import type { Metadata } from "next";
import { PartnershipsPageContent } from "@/components/partnerships/PartnershipsPageContent";
import { BRAND_NAME } from "@/lib/brand-constants";

export const metadata: Metadata = {
  title: "Partnerships",
  description: `${BRAND_NAME} 2027 partnership packages: inclusion in our digital creative Times Square billboard, exhibition, speaking, and event access during UNGA week.`,
};

export default function PartnershipsPage() {
  return <PartnershipsPageContent />;
}
