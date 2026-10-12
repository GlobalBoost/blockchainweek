import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";
import { BRAND_NAME } from "@/lib/brand-constants";

export const metadata: Metadata = {
  title: "About",
  description: `The story behind ${BRAND_NAME}: fifteen years of blockchain events, and six days in Times Square, New York, September 13-18, 2027.`,
};

export default function AboutPage() {
  return <AboutPageContent />;
}
