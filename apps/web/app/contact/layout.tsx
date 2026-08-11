import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand-constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${BRAND_NAME} 2026 – New York City.`,
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
