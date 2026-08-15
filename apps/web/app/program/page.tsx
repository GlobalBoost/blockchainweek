import type { Metadata } from "next";
import { ProgramSchedule } from "@/components/program/ProgramSchedule";
import { TicketPricing } from "@/components/home/TicketPricing";
import { CTASection } from "@/components/ui/CTASection";
import { getProgramSchedule } from "@/lib/content";
import { BRAND_NAME, TICKETS_SECTION_HASH } from "@/lib/brand-constants";

export const metadata: Metadata = {
  title: "Official Program",
  description: `${BRAND_NAME} 2026 official events schedule – September 10–19 in New York City during UNGA week.`,
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
