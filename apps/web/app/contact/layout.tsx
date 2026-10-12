import type { Metadata } from "next";
import { BRAND_NAME } from "@/lib/brand-constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${BRAND_NAME} 2027 in Times Square, New York.`,
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
