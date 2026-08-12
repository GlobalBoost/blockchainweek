import type { Metadata } from "next";
import { CalendarDays, Mic2, Network, Sparkles } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TicketPricing } from "@/components/home/TicketPricing";
import { CTASection } from "@/components/ui/CTASection";
import { getConferenceAgenda } from "@/lib/content";
import { BRAND_NAME, CONFERENCE_EYEBROW, CONFERENCE_LOCATION, TICKETS_SECTION_HASH } from "@/lib/brand-constants";

export const metadata: Metadata = {
  title: "The Conference",
  description: `${BRAND_NAME} Conference 2026 – Sept 16–17 flagship program during UNGA week.`,
};

const HIGHLIGHTS = [
  {
    icon: Sparkles,
    title: "High-Signal Content",
    desc: "Curated discussions focused on real-world adoption, policy, and strategic decision-making during UNGA week.",
  },
  {
    icon: CalendarDays,
    title: "Full Week Access Included",
    desc: `Your ticket gives you access to the entire 10-day ${BRAND_NAME} (Sept 10–19), including all events, panels, and the 2-day conference.`,
  },
  {
    icon: Network,
    title: "Strategic Networking",
    desc: "Connect with institutional investors, government officials, energy leaders, and top builders in one of the most important weeks in New York.",
  },
];

export default function ConferencePage() {
  const agenda = getConferenceAgenda();

  return (
    <>
      <PageHero
        eyebrow={CONFERENCE_EYEBROW}
        title={`${BRAND_NAME} Conference 2026`}
        subtitle={`The flagship two-day conference within ${BRAND_NAME} – high-signal content when the world's leaders are all in New York.`}
        actions={[
          { label: "Secure Your Ticket", href: TICKETS_SECTION_HASH, variant: "gold" },
          { label: "View Agenda", href: "#agenda", variant: "secondary" },
        ]}
      />

      <section className="section-light py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <SectionHeader
            title="The Most Important Two Days of the Week"
            subtitle={`The ${BRAND_NAME} Conference is the official two-day program within ${BRAND_NAME}, bringing together senior policymakers, institutional leaders, and builders for high-level discussions on Bitcoin, AI, Energy, Space, and blockchain adoption.`}
          />
        </div>
      </section>

      <section className="section-light pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Why Attend" title="Built for Decision-Makers" align="left" />
          <div className="grid gap-6 md:grid-cols-3">
            {HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-un-blue/10 text-un-blue">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="agenda" className="section-dark py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <SectionHeader
            theme="dark"
            eyebrow="Conference Agenda"
            title="Two Days. Four Tracks Each."
            subtitle={`September 16–17 · ${CONFERENCE_LOCATION} · Part of the full 10-day ${BRAND_NAME}`}
          />

          <div className="space-y-10">
            {agenda.map((day) => (
              <div key={day.label} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                <div className="border-b border-white/10 bg-white/5 px-6 py-5 sm:px-8">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="rounded-full bg-un-blue/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-un-blue">
                      {day.label}
                    </span>
                    <p className="text-sm text-white/70">{day.date}</p>
                  </div>
                </div>
                <div className="divide-y divide-white/10">
                  {day.sessions.map((session) => (
                    <div
                      key={session.title}
                      className="flex flex-col gap-2 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8"
                    >
                      <div className="flex items-start gap-3">
                        <Mic2 className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        <p className="font-medium text-white/90">{session.title}</p>
                      </div>
                      <p className="shrink-0 text-sm font-semibold text-un-blue sm:pl-4">{session.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TicketPricing />
      <CTASection ticketsHref={TICKETS_SECTION_HASH} />
    </>
  );
}
