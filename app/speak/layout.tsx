import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speak",
  description:
    "Submit your session or panel proposal for UN Blockchain Week 2026 via Sessionize. Speak in Times Square during UNGA week.",
};

export default function SpeakLayout({ children }: { children: React.ReactNode }) {
  return children;
}
