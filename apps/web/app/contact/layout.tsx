import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Blockchain Week - UNGA Edition 2026 – New York City.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
