import type { Metadata } from "next";
import { ImAttendingGenerator } from "@/components/collateral/ImAttendingGenerator";
import { EVENT_DATES, EVENT_LOCATION } from "@/lib/brand-constants";

export const metadata: Metadata = {
  title: "I'm Attending",
  description:
    "Upload your photo to create a shareable UN Blockchain Week 2026 “I'm Attending” graphic for Instagram, LinkedIn, and X.",
  alternates: { canonical: "/im-attending" },
};

export default function ImAttendingPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0d1b2a] via-[#0a1628] to-[#0a0a0f]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,158,219,0.14),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,162,39,0.08),_transparent_50%)]" />

      <div className="relative mx-auto flex min-h-[calc(100dvh-4.5rem)] max-w-6xl items-center px-4 py-8 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <ImAttendingGenerator
          copy={
            <header className="w-full">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-un-blue sm:text-sm">
                {EVENT_DATES} · {EVENT_LOCATION}
              </p>
              <h1 className="heading-font mt-3 text-[2.35rem] leading-[0.95] text-runway-white sm:mt-4 sm:text-5xl lg:text-6xl">
                I&apos;m Attending
              </h1>
              <p className="mt-3 text-base leading-relaxed text-white/70 sm:mt-5 sm:text-lg">
                Upload your photo to create a shareable UN Blockchain Week graphic for Instagram,
                LinkedIn, and X.
              </p>
            </header>
          }
        />
      </div>
    </section>
  );
}
