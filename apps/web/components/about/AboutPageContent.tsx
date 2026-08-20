import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpeakerCard } from "@/components/speakers/SpeakerCard";
import { getAboutContent, getSpeakerBySlug } from "@/lib/content";
import {
  BRAND_NAME,
  EVENT_DATES,
  EVENT_LOCATION,
  TICKETS_ANCHOR,
} from "@/lib/brand-constants";
import { BrandName, emphasizeBrand } from "@/components/ui/BrandName";

function StoryParagraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-5 text-base leading-relaxed text-white/75 sm:text-lg">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{emphasizeBrand(paragraph)}</p>
      ))}
    </div>
  );
}

function LightStoryParagraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{emphasizeBrand(paragraph)}</p>
      ))}
    </div>
  );
}

export function AboutPageContent() {
  const about = getAboutContent();
  const [heritage, groundUp, nextChapter] = about.sections;
  const leadershipSpeakers = about.leadership.featuredSpeakerSlugs
    .map((slug) => getSpeakerBySlug(slug))
    .filter((speaker): speaker is NonNullable<typeof speaker> => speaker != null);

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
            {about.hero.subtitle}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={TICKETS_ANCHOR}
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-un-blue px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-un-blue/90"
            >
              Secure your spot
            </Link>
            <Link
              href="/program"
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-white/25 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:border-un-blue hover:text-un-blue"
            >
              View program
            </Link>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0a0a0f] to-transparent sm:h-32" />
      </section>

      {/* By the numbers */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0d1b2a] via-[#0a1628] to-[#0a0a0f] py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,158,219,0.12),_transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,162,39,0.08),_transparent_50%)]" />

        <div className="relative mx-auto max-w-6xl px-4 lg:px-8">
          <SectionHeader
            theme="dark"
            eyebrow="By the numbers"
            title="Built over fifteen years. Scaling for 2026."
            className="mb-10"
          />
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {about.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur-sm"
              >
                <dt className="heading-font text-3xl text-un-blue sm:text-4xl">{metric.value}</dt>
                <dd className="mt-2 text-sm font-bold uppercase tracking-wider text-white">{metric.label}</dd>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{metric.description}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Heritage */}
      {heritage && (
        <section id={heritage.id} className="section-dark py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-un-blue">01</p>
            <h2 className="heading-font mt-3 text-3xl text-runway-white sm:text-4xl">{heritage.title}</h2>
            <div className="mt-8">
              <StoryParagraphs paragraphs={heritage.paragraphs} />
            </div>
          </div>
        </section>
      )}

      {/* From the ground up + panel image */}
      {groundUp && (
        <section id={groundUp.id} className="section-light py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm lg:grid lg:grid-cols-2">
              <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-un-blue">02</p>
                <h2 className="heading-font mt-3 text-3xl text-ink sm:text-4xl">{groundUp.title}</h2>
                <div className="mt-8">
                  <LightStoryParagraphs paragraphs={groundUp.paragraphs} />
                </div>
              </div>
              <div className="relative min-h-[320px] bg-[#0d1b2a] lg:min-h-full">
                <Image
                  src={about.images.speakersPanel}
                  alt="Speakers and leaders at Blockchain Week - UNGA Edition"
                  fill
                  className="object-cover object-[center_28%]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2026 next chapter */}
      {nextChapter && (
        <section id={nextChapter.id} className="section-dark py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">03</p>
                <h2 className="heading-font mt-3 text-3xl text-runway-white sm:text-4xl">{nextChapter.title}</h2>
                <div className="mt-8">
                  <StoryParagraphs paragraphs={nextChapter.paragraphs} />
                </div>
                <div className="mt-8">
                  <Link
                    href="/program"
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-gold/90"
                  >
                    Full 10-day program
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="relative mt-10 min-h-[280px] overflow-hidden rounded-3xl border border-white/10 lg:mt-0 lg:min-h-[420px]">
                <Image
                  src={about.images.speakingOpportunity}
                  alt="Blockchain Week - UNGA Edition in Times Square"
                  fill
                  className="object-cover object-[center_18%]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Leadership & speakers */}
      <section className="section-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeader title={about.leadership.title} className="mb-8" />
            <div className="space-y-5 text-left text-base leading-relaxed text-ink-muted sm:text-lg">
              {about.leadership.paragraphs.map((paragraph, index) => (
                <p key={index}>{emphasizeBrand(paragraph)}</p>
              ))}
            </div>
          </div>

          {leadershipSpeakers.length > 0 && (
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {leadershipSpeakers.map((speaker) => (
                <SpeakerCard key={speaker.slug} speaker={speaker} />
              ))}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              href={about.leadership.ctaHref}
              className="inline-flex items-center gap-2 rounded-full bg-un-blue px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-un-blue/90"
            >
              {about.leadership.ctaLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0d1b2a] via-[#0a1628] to-[#0a0a0f] py-16 sm:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,162,39,0.1),_transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Our purpose</p>
          <h2 className="heading-font mt-3 text-3xl text-runway-white sm:text-4xl">{about.mission.title}</h2>
          <blockquote className="mt-8 border-l-0 text-lg leading-relaxed text-white/80 sm:text-xl sm:leading-relaxed">
            {about.mission.paragraphs.map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-5" : undefined}>
                {emphasizeBrand(paragraph)}
              </p>
            ))}
          </blockquote>
        </div>
      </section>

      {/* UN disclaimer */}
      <section className="border-y border-black/5 bg-[#f7f7f8] py-8">
        <p className="mx-auto max-w-3xl px-4 text-center text-sm leading-relaxed text-ink-muted lg:px-8">
          <BrandName /> is an independent initiative and is not affiliated with the United Nations.
        </p>
      </section>

      {/* CTA */}
      <section className="section-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm lg:grid lg:grid-cols-2">
            <div className="flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 lg:py-14">
              <SectionHeader
                title="Ready to be part of the story?"
                subtitle="Limited speaking slots and sponsorship opportunities are available for leaders who want to shape the conversation during UNGA week in Times Square."
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
            <div className="relative min-h-[280px] bg-[#0d1b2a] lg:min-h-full">
              <Image
                src="/hero/nyc-skyline.png"
                alt=""
                fill
                className="object-cover object-center opacity-90"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent lg:from-white/90" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
