import Image from "next/image";
import Link from "next/link";
import { Globe2, Megaphone, Network } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TestimonialsSection } from "@/components/ui/TestimonialsSection";
import { getAboutContent } from "@/lib/content";
import { BRAND_NAME, EVENT_DATES, EVENT_LOCATION, TICKETS_ANCHOR } from "@/lib/brand-constants";

const HIGHLIGHT_ICONS = [Megaphone, Network, Globe2];

export function AboutPageContent() {
  const about = getAboutContent();

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[72vh] flex-col justify-center overflow-hidden pb-20 pt-24 sm:min-h-[78vh] sm:pb-24 sm:pt-28">
        <div className="absolute inset-0 bg-[#0a0a0f]" />
        <Image
          src="/hero/nyc-skyline.png"
          alt=""
          fill
          priority
          className="object-cover object-[center_55%] sm:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/75 via-[#0a0a0f]/45 to-[#0a0a0f]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/60" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-un-blue">
            UNGA + NYFW 2026 · {EVENT_DATES} · {EVENT_LOCATION}
          </p>
          <h1 className="heading-font mt-4 text-4xl leading-tight text-runway-white sm:text-5xl lg:text-6xl">
            About {BRAND_NAME}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75">
            The premier platform where corporations and visionary leaders speak directly to the world&apos;s most
            influential policymakers during the United Nations General Assembly.
          </p>
          <div className="mt-10">
            <Link
              href={TICKETS_ANCHOR}
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-un-blue px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-un-blue/90"
            >
              Secure your spot
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0f] to-transparent sm:h-32" />
      </section>

      {/* Intro */}
      <section className="section-dark py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <SectionHeader
            theme="dark"
            title="Your direct line to the world's leaders"
            subtitle="During the most important week on the global calendar."
            className="mb-8"
          />
          <div className="space-y-5 text-left text-base leading-relaxed text-white/75 sm:text-lg">
            <p>
              Blockchain Week - UNGA Edition is not just an event. It is the only blockchain gathering timed precisely with the
              United Nations General Assembly and New York Fashion Week.
            </p>
            <p>
              For high-level corporations and visionary executives, this is your unmatched opportunity to address world
              leaders, diplomats, heads of state, and global policymakers in the same week they are all gathered in New
              York City.
            </p>
            <p>
              Speak on stage. Host private roundtables. Secure high-visibility partnerships. Influence global policy on
              Bitcoin, AI governance, space economy, and sustainable blockchain innovation – while the eyes of the world
              are on the UN.
            </p>
          </div>
        </div>
      </section>

      {/* Stats + panel image */}
      <section className="section-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm lg:grid lg:grid-cols-2">
            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
                {about.stats.map((stat) => (
                  <div key={stat.label} className="border-l-2 border-un-blue/30 pl-5">
                    <p className="heading-font text-5xl text-un-blue">{stat.value}</p>
                    <h3 className="mt-2 font-bold text-ink">{stat.label}</h3>
                    <p className="mt-1 text-sm text-ink-muted">{stat.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[320px] bg-[#0d1b2a] lg:min-h-full">
              <Image
                src={about.images.speakersPanel}
                alt="High-level speakers at Blockchain Week - UNGA Edition"
                fill
                className="object-cover object-[center_28%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="section-light pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader
            eyebrow="For corporations & visionaries"
            title="Position yourself at the center of global influence"
          />
          <div className="grid gap-6 md:grid-cols-3">
            {about.highlights.map((item, i) => {
              const Icon = HIGHLIGHT_ICONS[i] ?? Globe2;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-black/5 bg-white p-7 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-un-blue/10 text-un-blue">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <TestimonialsSection />

      {/* CTA */}
      <section className="section-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm lg:grid lg:grid-cols-2">
            <div className="relative order-2 min-h-[280px] bg-[#0d1b2a] lg:order-1 lg:min-h-full">
              <Image
                src={about.images.speakingOpportunity}
                alt="High-level speaking opportunity at Blockchain Week - UNGA Edition"
                fill
                className="object-cover object-[center_18%]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 flex flex-col justify-center px-6 py-10 sm:px-10 lg:order-2 lg:px-12 lg:py-14">
              <SectionHeader
                title="Ready to lead the conversation?"
                subtitle="Limited speaking slots and sponsorship opportunities are available for corporations and high-profile leaders who want to be heard by the world's most influential audience during UNGA week."
                align="left"
                className="mb-8"
              />
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/speak"
                  className="inline-flex items-center justify-center rounded-full bg-un-blue px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-un-blue/90"
                >
                  Apply to speak
                </Link>
                <Link
                  href="/partnerships"
                  className="inline-flex items-center justify-center rounded-full border border-un-blue px-7 py-3 text-sm font-bold uppercase tracking-wide text-un-blue transition hover:bg-un-blue/5"
                >
                  Explore partnerships
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
