import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: "About",
  description:
    "About UN Blockchain Week 2026 – the premier platform where corporations and visionary leaders speak to policymakers during UNGA in New York City.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
