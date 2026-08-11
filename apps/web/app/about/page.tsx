import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";
import { BRAND_NAME } from "@/lib/brand-constants";

export const metadata: Metadata = {
  title: "About",
  description: `About ${BRAND_NAME} 2026 – the premier platform where corporations and visionary leaders speak to policymakers during UNGA in New York City.`,
};

export default function AboutPage() {
  return <AboutPageContent />;
}
