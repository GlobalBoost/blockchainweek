import type { Metadata } from "next";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/ui/CTASection";
import { SpeakerGrid } from "@/components/speakers/SpeakerGrid";
import { getSpeakers } from "@/lib/content";
import { BRAND_NAME } from "@/lib/brand-constants";

export const metadata: Metadata = {
  title: "Speakers",
  description: `Meet the visionaries speaking at ${BRAND_NAME} 2026 during UNGA + NYFW.`,
};

export default function SpeakersPage() {
  const speakers = getSpeakers();

  return (
    <>
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            eyebrow="Our speakers"
            title={`The Visionaries of ${BRAND_NAME}`}
            subtitle="Policymakers · Builders · Investors · Founders shaping Bitcoin, AI, Energy, Space & Fashion"
          />
          <SpeakerGrid speakers={speakers} />
        </div>
      </div>
      <CTASection />
    </>
  );
}
