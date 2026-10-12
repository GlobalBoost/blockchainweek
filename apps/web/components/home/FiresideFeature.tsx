"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FIRESIDE_LUMA_URL, FIRESIDE_PATH } from "@/lib/brand-constants";
import { LUMA_PUBLIC_URL } from "@/lib/luma";
import { getFiresidePhase, type FiresidePhase } from "@/lib/fireside";

export function FiresideFeature({ initialPhase }: { initialPhase: FiresidePhase }) {
  const [phase, setPhase] = useState(initialPhase);
  const reminderHref = FIRESIDE_LUMA_URL || LUMA_PUBLIC_URL;

  useEffect(() => {
    const tick = () => setPhase(getFiresidePhase());
    tick();
    const timer = setInterval(tick, 30_000);
    return () => clearInterval(timer);
  }, []);

  const watchLabel =
    phase === "live" ? "LIVE NOW: Watch" : phase === "replay" ? "Watch the Replay" : "Watch Live";

  return (
    <section className="section-dark border-y border-white/10 py-14 sm:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-gold/30">
          <Image
            src="/fireside/square.png"
            alt="Karla Ballard and Ivonne A-Baki, The Human Future"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 480px"
            priority
          />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            A global fireside conversation
          </p>
          <h2 className="heading-font mt-3 text-3xl text-runway-white sm:text-4xl">
            The Human Future: AI, Peace & The Next United Nations
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80 sm:text-lg">
            Ivonne A-Baki, candidate for UN Secretary-General, joins Karla Ballard on why AI must protect human life, never take it.
          </p>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-un-blue">
            Tuesday, October 13, 2026 · 10:00 AM ET
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={FIRESIDE_PATH}
              className="inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-bold uppercase tracking-wider text-black transition hover:bg-gold/90"
            >
              {phase === "live" ? (
                <span className="h-2.5 w-2.5 rounded-full bg-red-600" aria-hidden />
              ) : null}
              {watchLabel}
            </Link>
            <a
              href={reminderHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-white/25 px-7 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:border-gold hover:text-gold"
            >
              Register for Reminders
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
