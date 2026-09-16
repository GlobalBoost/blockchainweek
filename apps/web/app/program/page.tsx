import type { Metadata } from "next";
import { ProgramSchedule } from "@/components/program/ProgramSchedule";
import { TicketPricing } from "@/components/home/TicketPricing";
import { CTASection } from "@/components/ui/CTASection";
import { getProgramAgenda } from "@/lib/content";
import { BRAND_NAME, SOCIAL_PREVIEW_HEIGHT, SOCIAL_PREVIEW_WIDTH, TICKETS_SECTION_HASH } from "@/lib/brand-constants";

const description = `${BRAND_NAME} 2026 confirmed programming – timed run of show for CryptoMondays, Liberland Meetup, the Gallery MC main stage, BitcoinPalooza, and the Washington Elite Investment Summit & Gala.`;

export const metadata: Metadata = {
  title: "Confirmed Programming",
  description,
  alternates: { canonical: "/program" },
  openGraph: {
    title: "Confirmed Programming",
    description,
    url: "/program",
    type: "website",
    images: [
      {
        url: "/program/opengraph-image",
        width: SOCIAL_PREVIEW_WIDTH,
        height: SOCIAL_PREVIEW_HEIGHT,
        alt: "Confirmed Programming for Blockchain Week - UNGA Edition 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Confirmed Programming",
    description,
    images: ["/program/opengraph-image"],
  },
};

export default function ProgramPage() {
  const agenda = getProgramAgenda();

  return (
    <>
      <ProgramSchedule agenda={agenda} />
      <TicketPricing />
      <CTASection ticketsHref={TICKETS_SECTION_HASH} />
    </>
  );
}
