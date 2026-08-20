import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";
import { BRAND_NAME } from "@/lib/brand-constants";

export const metadata: Metadata = {
  title: "About",
  description: `The story behind ${BRAND_NAME} — fifteen years of blockchain events, a grassroots UNGA-week gathering, and our first flagship two-day conference in Times Square, September 2026.`,
};

export default function AboutPage() {
  return <AboutPageContent />;
}
