import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand-constants";

export const metadata: Metadata = {
  title: "Speak",
  description: `The 2027 call for speakers at ${BRAND_NAME} opens soon. Six days in Times Square, New York.`,
};

export default function SpeakLayout({ children }: { children: React.ReactNode }) {
  return children;
}
