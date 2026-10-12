import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CTASection } from "@/components/ui/CTASection";
import { SpeakerGrid } from "@/components/speakers/SpeakerGrid";
import { getSpeakers } from "@/lib/content";
import { BRAND_NAME } from "@/lib/brand-constants";

export const metadata: Metadata = {
  title: "Speakers",
  description: `Past speakers who have taken the stage at ${BRAND_NAME}. 2027 speakers will be announced soon.`,
};

export default function SpeakersPage() {
  const speakers = getSpeakers();

  return (
    <>
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            eyebrow="Past speakers"
            title="Past Speakers"
            subtitle="The leaders who have taken the stage at Blockchain Week - UNGA Edition. 2027 speakers will be announced soon."
          />
          <div className="mb-10 text-center">
            <Link
              href="/speak"
              className="inline-flex rounded-full bg-un-blue px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-un-blue/90"
            >
              Apply to speak in 2027
            </Link>
          </div>
          <SpeakerGrid speakers={speakers} />
        </div>
      </div>
      <CTASection />
    </>
  );
}
