"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { TICKETS_ANCHOR } from "@/lib/brand-constants";

export function HeroVideo() {
  return (
    <section className="relative isolate flex flex-col justify-center overflow-hidden py-16 sm:min-h-[calc(100svh-4rem)] sm:py-20 lg:min-h-[92vh] lg:pb-32 lg:pt-36">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <Image
        src="/hero/nyc-skyline.png"
        alt="New York City skyline at night from the Brooklyn Bridge"
        fill
        priority
        className="object-cover object-[center_55%] sm:object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/75 via-[#0a0a0f]/45 to-[#0a0a0f]/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-[#0a0a0f]/60" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-8 lg:max-w-7xl lg:px-12"
      >
        <div className="mx-auto max-w-5xl text-center lg:max-w-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/hero-wordmark.svg"
            alt="Blockchain Week 2026"
            width={1024}
            height={85}
            className="mx-auto mb-5 h-auto w-[min(88vw,44rem)] sm:mb-8 lg:mb-10"
            fetchPriority="high"
          />

          {/* Headline – two lines; scale down on narrow screens so nowrap never clips */}
          <h1 className="heading-font leading-[0.95] tracking-tight">
            <span className="block whitespace-nowrap text-[clamp(1.15rem,5.8vw,5.5rem)] text-runway-white sm:text-[clamp(2.25rem,8vw,5.5rem)]">
              BITCOIN.{" "}
              <span className="gradient-text">AI & ENERGY.</span>
            </span>
            <span className="mt-2 block whitespace-nowrap text-[clamp(1.15rem,5.8vw,5.5rem)] sm:mt-3 sm:text-[clamp(2.25rem,8vw,5.5rem)]">
              <span className="text-fashion">SPACE.</span>{" "}
              <span className="text-runway-white">FASHION.</span>
            </span>
          </h1>

          {/* Meta line – below headline */}
          <p className="mx-auto mt-5 max-w-3xl text-[clamp(0.7rem,2.2vw,1.05rem)] font-medium uppercase tracking-[0.12em] text-un-blue sm:mt-10 sm:tracking-[0.18em] lg:mt-12 lg:text-base">
            UNGA + NYFW 2026 · September 10–19, 2026 · Times Square, NYC
          </p>

          {/* CTAs – spaced from headline and from next section */}
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:mt-14 sm:flex-row sm:items-center sm:gap-4 lg:mt-16">
            <Link
              href={TICKETS_ANCHOR}
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-un-blue px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-un-blue/90 sm:min-w-[220px]"
            >
              Secure Your Ticket
            </Link>
            <Link
              href="/#featured-speakers"
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-white/25 bg-white/5 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition hover:border-un-blue hover:text-un-blue sm:min-w-[220px]"
            >
              See Our Speakers
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Bottom fade + breathing room before stats */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0a0a0f] to-transparent sm:h-24 lg:h-32" />
    </section>
  );
}
