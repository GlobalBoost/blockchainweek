import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand-constants";

export const metadata: Metadata = {
  title: "Speak",
  description: `Submit your session or panel proposal for ${BRAND_NAME} 2026 via Sessionize. Speak at Gallery MC during UNGA week in New York City.`,
};

export default function SpeakLayout({ children }: { children: React.ReactNode }) {
  return children;
}
