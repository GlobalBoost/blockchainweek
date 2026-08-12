import type { Metadata } from "next";
import { ImAttendingGenerator } from "@/components/collateral/ImAttendingGenerator";
import { BRAND_NAME, EVENT_DATES, EVENT_LOCATION } from "@/lib/brand-constants";

const TEMPLATE_SRC = "/collateral/im-attending-template.jpg";

const pageTitle = "I'm Attending";
const pageDescription = `Upload your photo to create a shareable ${BRAND_NAME} graphic for Instagram, LinkedIn, and X.`;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/im-attending" },
  openGraph: {
    title: `${pageTitle} | ${BRAND_NAME}`,
    description: pageDescription,
  },
  twitter: {
    title: `${pageTitle} | ${BRAND_NAME}`,
    description: pageDescription,
  },
};

export default function ImAttendingPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0d1b2a] via-[#0a1628] to-[#0a0a0f]">
      <link rel="preload" as="image" href={TEMPLATE_SRC} fetchPriority="high" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,158,219,0.14),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,162,39,0.08),_transparent_50%)]" />

      <div className="relative mx-auto flex min-h-[calc(100dvh-4.5rem)] max-w-6xl items-center px-4 py-8 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <ImAttendingGenerator
          copy={
            <header className="w-full">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-un-blue sm:whitespace-nowrap sm:text-xs sm:tracking-[0.22em]">
                {EVENT_DATES} · {EVENT_LOCATION}
              </p>
              <h1 className="heading-font mt-3 text-[2.35rem] leading-[0.95] text-runway-white sm:mt-4 sm:text-5xl lg:text-6xl">
                I&apos;m Attending
              </h1>
              <p className="mt-3 text-base leading-relaxed text-white/70 sm:mt-5 sm:text-lg">
                Upload your photo to create a shareable {BRAND_NAME} graphic for Instagram,
                LinkedIn, and X.
              </p>
            </header>
          }
        />
      </div>
    </section>
  );
}
