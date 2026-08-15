import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Globe2,
  Mic2,
  Sparkles,
  Ticket,
  Users,
  Zap,
} from "lucide-react";
import { TrackedExternalLink } from "@/components/analytics/TrackedExternalLink";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  CONFERENCE_LOCATION,
  EVENT_DATES,
  EVENT_LOCATION,
  SESSIONIZE_SPEAKERS_URL,
  BRAND_NAME,
} from "@/lib/brand-constants";
import { BrandName } from "@/components/ui/BrandName";
import { LUMA_PUBLIC_URL } from "@/lib/luma";

const PROGRAMMING = [
  { date: "September 14", title: "CryptoMondays" },
  { date: "September 15", title: "Tech Tuesdays" },
  { date: "September 16", title: "MAHA Wednesdays" },
  { date: "September 16–17", title: `${BRAND_NAME} Premiere Conference` },
  { date: "September 17", title: "BitcoinPalooza" },
  { date: "September 18", title: "Washington Elite Investment Summit & Gala" },
];

const SUBMISSION_PHASES = [
  {
    title: "Priority Round",
    dates: "June 30 – July 25, 2026",
    desc: "Apply early for priority consideration and faster review.",
    active: false,
  },
  {
    title: "Main Open Call",
    dates: "July 26 – August 15, 2026",
    desc: "Our primary submission window for session and panel proposals.",
    active: true,
  },
  {
    title: "Final Round",
    dates: "August 16 – August 31, 2026",
    desc: "Last chance to submit. Strong proposals are still welcome.",
    active: false,
  },
];

const FORMATS = [
  "Panel Discussion",
  "Keynote",
  "Fireside Chat",
  "Workshop",
  "Lightning Talk",
];

const TOPICS = [
  "Blockchain & cryptocurrency",
  "Artificial intelligence",
  "Energy & sustainability",
  "Liberty & privacy",
  "Space technology",
  "DeFi & real-world adoption",
  "Regulation & policy",
];

const BENEFITS = [
  {
    icon: Ticket,
    title: "Full Week Access",
    desc: (
      <>
        Complimentary access to <BrandName /> programming for accepted speakers.
      </>
    ),
  },
  {
    icon: Globe2,
    title: "Global Visibility",
    desc: "Prominent placement during UNGA week when policymakers and investors are in New York.",
  },
  {
    icon: Users,
    title: "Elite Networking",
    desc: "Includes access to the Washington Elite Investment Summit & Gala and VIP side events.",
  },
];

export default function SpeakPage() {
  return (
    <>
      <PageHero
        eyebrow="Call for Speakers · Open Now"
        title="Shape the Future of Blockchain at the UN"
        subtitle={
          <>
            <BrandName /> 2026 brings together world leaders, investors, policymakers, and builders in{" "}
            {CONFERENCE_LOCATION} during UNGA and New York Fashion Week.
          </>
        }
        actions={[
          {
            label: "Submit on Sessionize",
            href: SESSIONIZE_SPEAKERS_URL,
            variant: "gold",
            external: true,
            event: "speaker_apply_click",
            eventProperties: { placement: "speak-hero" },
          },
          { label: "View Programming", href: "#programming", variant: "secondary" },
        ]}
      />

      <section className="section-light py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <SectionHeader
            eyebrow={EVENT_DATES}
            title="A Global Stage in the Heart of Times Square"
            subtitle="This landmark 10-day experience explores blockchain, cryptocurrency, AI, energy, space innovation, liberty, privacy, and policy through high-impact panels, keynotes, fireside chats, workshops, and exclusive networking."
          />
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-ink-muted">
            We welcome proposals from founders, executives, researchers, policymakers, and builders.
            Submit your session or panel through our official{" "}
            <TrackedExternalLink
              href={SESSIONIZE_SPEAKERS_URL}
              event="speaker_apply_click"
              eventProperties={{ placement: "speak-intro" }}
              className="font-semibold text-un-blue hover:underline"
            >
              Sessionize call for speakers
            </TrackedExternalLink>
            .
          </p>
        </div>
      </section>

      <section id="programming" className="section-light pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            eyebrow="Featured Programming"
            title="Speak Across the Full Week"
            subtitle={`${EVENT_LOCATION} · Themed days and flagship conferences throughout the program.`}
            align="left"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROGRAMMING.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:border-un-blue/20 hover:shadow-md"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-un-blue">{item.date}</p>
                <h3 className="mt-2 text-lg font-bold text-ink">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            theme="dark"
            eyebrow="Submission Timeline"
            title="Three Phases to Apply"
            subtitle="Proposals are reviewed on a rolling basis. Earlier submissions receive priority consideration."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {SUBMISSION_PHASES.map((phase) => (
              <div
                key={phase.title}
                className={`rounded-2xl border p-6 sm:p-7 ${
                  phase.active
                    ? "border-un-blue/40 bg-gradient-to-b from-un-blue/15 to-white/[0.02]"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                {phase.active && (
                  <span className="mb-3 inline-block rounded-full bg-un-blue px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    Current window
                  </span>
                )}
                <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                <p className="mt-2 text-sm font-semibold text-un-blue">{phase.dates}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{phase.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-white/50">
            Call closes August 31, 2026 at 11:59 PM Eastern Daylight Time (UTC-04:00).
          </p>
        </div>
      </section>

      <section className="section-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <SectionHeader
                eyebrow="What We&apos;re Looking For"
                title="Thought-Provoking Sessions With Real Impact"
                subtitle="We especially encourage strong panel proposals that bring together diverse perspectives from industry, policy, academia, and emerging voices."
                align="left"
                className="mb-6"
              />
              <ul className="space-y-3">
                {TOPICS.map((topic) => (
                  <li key={topic} className="flex gap-3 text-sm text-ink-muted">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-un-blue" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-ink-muted">
                Sessions should deliver actionable insights for intermediate to advanced audiences,
                with forward-looking discussions suitable for founders, investors, developers, regulators,
                and creative innovators.
              </p>
            </div>

            <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <Mic2 className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-2xl font-bold text-ink">Accepted Session Formats</h3>
              <ul className="mt-6 space-y-3">
                {FORMATS.map((format) => (
                  <li key={format} className="flex items-center gap-3 text-sm font-medium text-ink">
                    <span className="h-1.5 w-1.5 rounded-full bg-un-blue" />
                    {format}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-light pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Speaker Benefits" title={`Why Speak at ${BRAND_NAME}`} align="left" />
          <div className="grid gap-6 md:grid-cols-3">
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
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

      <section id="apply" className="section-dark py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-un-blue/30 bg-gradient-to-b from-un-blue/15 via-un-blue/5 to-transparent p-8 text-center sm:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-un-blue/20 text-un-blue">
              <Zap className="h-7 w-7" />
            </div>
            <h2 className="heading-font mt-6 text-3xl text-white sm:text-4xl">Ready to Submit?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/75">
              Proposals are submitted through Sessionize, our official call-for-speakers platform.
              Speaking is free and includes Washington Elite Investment Summit & Gala access for accepted speakers.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <TrackedExternalLink
                href={SESSIONIZE_SPEAKERS_URL}
                event="speaker_apply_click"
                eventProperties={{ placement: "speak-apply" }}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-gold/90"
              >
                Submit a Session
                <ArrowUpRight className="h-4 w-4" />
              </TrackedExternalLink>
              <Link
                href="/speakers"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:border-un-blue hover:text-un-blue"
              >
                View Confirmed Speakers
              </Link>
            </div>
            <p className="mt-8 flex items-center justify-center gap-2 text-sm text-white/50">
              <CalendarDays className="h-4 w-4" />
              {EVENT_DATES} · {EVENT_LOCATION}
            </p>
          </div>

          <p className="mt-8 text-center text-sm text-white/50">
            Explore the full event calendar on{" "}
            <TrackedExternalLink
              href={LUMA_PUBLIC_URL}
              event="calendar_click"
              eventProperties={{ placement: "speak-footer" }}
              className="font-semibold text-un-blue hover:underline"
            >
              Luma
            </TrackedExternalLink>
            .
          </p>
        </div>
      </section>
    </>
  );
}
