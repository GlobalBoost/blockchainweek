import Image from "next/image";
import Link from "next/link";
import { TICKETS_ANCHOR } from "@/lib/brand-constants";
import { Globe } from "lucide-react";
import { TweetEmbed } from "@/components/speakers/TweetEmbed";
import { SpeakerBackButton } from "@/components/speakers/SpeakerBackButton";
import { AlsoSpeaking } from "@/components/speakers/AlsoSpeaking";
import type { Speaker } from "@/lib/types";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-un-blue/40 text-un-blue transition hover:scale-105 hover:bg-un-blue/10"
    >
      {children}
    </a>
  );
}

function FeatureCard({
  title,
  accent,
  children,
}: {
  title: string;
  accent: "blue" | "fashion" | "quote";
  children: React.ReactNode;
}) {
  const styles = {
    blue: "border-t-4 border-un-blue",
    fashion: "border-t-4 border-fashion",
    quote: "border border-un-blue/30",
  };

  const titleStyles = {
    blue: "text-un-blue",
    fashion: "text-fashion",
    quote: "sr-only",
  };

  return (
    <div className={`rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 ${styles[accent]}`}>
      {accent !== "quote" && (
        <h2 className={`mb-5 text-xl font-bold tracking-wide ${titleStyles[accent]}`}>{title}</h2>
      )}
      {children}
    </div>
  );
}

export function SpeakerPageContent({
  speaker,
  speakers,
  alsoSpeakingFallback,
}: {
  speaker: Speaker;
  speakers: Speaker[];
  alsoSpeakingFallback: Speaker[];
}) {
  return (
    <section className="section-dark pb-16 pt-6 sm:pb-20 sm:pt-8">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10 lg:p-12">
          <SpeakerBackButton />

          <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
              <div className="lg:col-span-5">
                <div className="relative aspect-square overflow-hidden rounded-3xl border-2 border-un-blue/30 shadow-2xl">
                  <Image
                    src={speaker.photo || "/logo.png"}
                    alt={speaker.name}
                    fill
                    unoptimized
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>

              <div className="lg:col-span-7">
                <h1 className="heading-font text-4xl sm:text-5xl">{speaker.name}</h1>
                <p className="mt-4 text-xl font-medium leading-relaxed text-un-blue sm:text-2xl">
                  {speaker.title}
                </p>
                {speaker.subtitle && (
                  <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-white/70 sm:text-lg">
                    {speaker.subtitle}
                  </p>
                )}
                {!speaker.subtitle && speaker.company && (
                  <p className="mt-3 text-base text-white/70 sm:text-lg">{speaker.company}</p>
                )}

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {speaker.social?.linkedin && (
                    <SocialButton href={speaker.social.linkedin} label={`${speaker.name} on LinkedIn`}>
                      <LinkedinIcon className="h-5 w-5" />
                    </SocialButton>
                  )}
                  {speaker.social?.twitter && (
                    <SocialButton href={speaker.social.twitter} label={`${speaker.name} on X`}>
                      <XIcon className="h-4 w-4" />
                    </SocialButton>
                  )}
                  {speaker.social?.website && (
                    <SocialButton href={speaker.social.website} label={`${speaker.name} website`}>
                      <Globe className="h-5 w-5" />
                    </SocialButton>
                  )}
                  <Link
                    href={TICKETS_ANCHOR}
                    className="inline-flex items-center justify-center rounded-full bg-un-blue px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-un-blue/90"
                  >
                    Secure your ticket
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-white/10 pt-12">
              {speaker.headline && (
                <h2 className="heading-font mb-8 text-3xl sm:text-4xl">{speaker.headline}</h2>
              )}

              <div className="max-w-4xl space-y-6">
                {speaker.bio.split("\n\n").filter(Boolean).map((p) => (
                  <p key={p.slice(0, 60)} className="text-base leading-relaxed text-white/80 sm:text-lg">
                    {p}
                  </p>
                ))}
              </div>

              {(speaker.expertise.length > 0 ||
                (speaker.signatureMoves && speaker.signatureMoves.length > 0) ||
                speaker.quote) && (
                <div className="mt-12 grid gap-6 md:grid-cols-3">
                  {speaker.expertise.length > 0 && (
                    <FeatureCard title="Expertise" accent="blue">
                      <ul className="space-y-3 text-sm text-white/80 sm:text-base">
                        {speaker.expertise.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="text-un-blue">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </FeatureCard>
                  )}

                  {speaker.signatureMoves && speaker.signatureMoves.length > 0 && (
                    <FeatureCard title="Signature Moves" accent="fashion">
                      <ul className="space-y-3 text-sm text-white/80 sm:text-base">
                        {speaker.signatureMoves.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="text-fashion">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </FeatureCard>
                  )}

                  {speaker.quote && speaker.quote.length > 10 && !speaker.quote.includes("charset") && (
                    <FeatureCard title="Quote" accent="quote">
                      <blockquote className="text-base italic leading-relaxed text-white/90 sm:text-lg">
                        &ldquo;{speaker.quote}&rdquo;
                      </blockquote>
                      <p className="mt-6 font-semibold text-un-blue">– {speaker.name}</p>
                    </FeatureCard>
                  )}
                </div>
              )}

              {speaker.performance && (
                <div className="mt-12 border-t border-white/10 pt-12">
                  <h2 className="heading-font mb-8 text-center text-2xl sm:text-3xl">
                    🎤 {speaker.performance.title}
                  </h2>
                  <TweetEmbed tweetUrl={speaker.performance.tweetUrl} />
                </div>
              )}
            </div>

          <AlsoSpeaking
            currentSlug={speaker.slug}
            speakers={speakers}
            fallbackSpeakers={alsoSpeakingFallback}
          />

          <div className="mt-10 flex justify-center">
            <Link
              href={TICKETS_ANCHOR}
              className="inline-flex items-center justify-center rounded-full bg-un-blue px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-un-blue/90"
            >
              Secure your ticket
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
