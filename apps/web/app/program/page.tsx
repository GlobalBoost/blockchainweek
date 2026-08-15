import type { Metadata } from "next";
import { ProgramSchedule } from "@/components/program/ProgramSchedule";
import { TicketPricing } from "@/components/home/TicketPricing";
import { CTASection } from "@/components/ui/CTASection";
import { getProgramSchedule } from "@/lib/content";
import { BRAND_NAME, SOCIAL_PREVIEW_HEIGHT, SOCIAL_PREVIEW_WIDTH, TICKETS_SECTION_HASH } from "@/lib/brand-constants";

const description = `${BRAND_NAME} 2026 official events schedule – September 10–19 in New York City during UNGA week.`;

export const metadata: Metadata = {
  title: "Official Program",
  description,
  alternates: { canonical: "/program" },
  openGraph: {
    title: "Official Events Schedule",
    description,
    url: "/program",
    type: "website",
    images: [
      {
        url: "/program/opengraph-image",
        width: SOCIAL_PREVIEW_WIDTH,
        height: SOCIAL_PREVIEW_HEIGHT,
        alt: "Official Events Schedule for Blockchain Week - UNGA Edition 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Official Events Schedule",
    description,
    images: ["/program/opengraph-image"],
  },
};

export default function ProgramPage() {
  const { intro, events, conference } = getProgramSchedule();

  return (
    <>
      <ProgramSchedule intro={intro} events={events} conference={conference} />
      <TicketPricing />
      <CTASection ticketsHref={TICKETS_SECTION_HASH} />
    </>
  );
}
