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
  CONTACT_EMAIL,
  EVENT_DATES,
  EVENT_LOCATION,
  BRAND_NAME,
} from "@/lib/brand-constants";
import { BrandName } from "@/components/ui/BrandName";
import { LUMA_PUBLIC_URL } from "@/lib/luma";

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
        eyebrow="Call for Speakers · 2027"
        title="Shape the Future of Blockchain at the UN"
        subtitle={
          <>
            The 2027 call for speakers opens soon. <BrandName /> returns {EVENT_DATES} in {EVENT_LOCATION}.
          </>
        }
        actions={[
          {
            label: "Email the programming team",
            href: `mailto:${CONTACT_EMAIL}?subject=2027%20speaker%20interest`,
            variant: "gold",
            external: true,
          },
        ]}
      />

      <section className="section-light py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
          <SectionHeader
            eyebrow={EVENT_DATES}
            title="A Global Stage in Times Square"
            subtitle="The 2027 program explores blockchain, cryptocurrency, AI, energy, space innovation, liberty, privacy, and policy through panels, keynotes, fireside chats, workshops, and networking."
          />
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-ink-muted">
            The 2027 call for speakers opens soon. Email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-un-blue hover:underline">
              {CONTACT_EMAIL}
            </a>{" "}
            to register your interest. We welcome proposals from founders, executives, researchers, policymakers, and builders.
          </p>
        </div>
      </section>

      <section className="section-dark py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <SectionHeader
            theme="dark"
            eyebrow="2027 call"
            title="The 2027 call for speakers opens soon"
            subtitle={`${EVENT_DATES} · ${EVENT_LOCATION}. Leave your email with the programming team and we will send the application window when it opens.`}
          />
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=2027%20speaker%20interest`}
            className="inline-flex rounded-full bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-black"
          >
            Email {CONTACT_EMAIL}
          </a>
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
            <h2 className="heading-font mt-6 text-3xl text-white sm:text-4xl">Register your interest</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/75">
              The 2027 call for speakers opens soon. Email the programming team and we will send dates when they are set.
              Speaking includes Washington Elite Investment Summit & Gala access for accepted speakers. The gala date will be announced.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=2027%20speaker%20interest`}
                className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-gold/90"
              >
                Email the team
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link
                href="/speakers"
                className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:border-un-blue hover:text-un-blue"
              >
                See past speakers
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
