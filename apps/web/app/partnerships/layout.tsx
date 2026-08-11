import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand-constants";

export const metadata: Metadata = {
  title: "Partnerships",
  description: `Sponsorship opportunities at ${BRAND_NAME} 2026.`,
};

export default function PartnershipsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
