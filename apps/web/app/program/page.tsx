import type { Metadata } from "next";
import { ProgramSchedule } from "@/components/program/ProgramSchedule";
import { LumaEmbed } from "@/components/events/LumaEmbed";
import { getProgramAgenda } from "@/lib/content";
import { BRAND_NAME, SOCIAL_PREVIEW_HEIGHT, SOCIAL_PREVIEW_WIDTH } from "@/lib/brand-constants";

const description = `2026 Program (archive) for ${BRAND_NAME}. The 2027 program will be announced soon. The live calendar is on Luma.`;

export const metadata: Metadata = {
  title: "Confirmed Programming",
  description,
  alternates: { canonical: "/program" },
  openGraph: {
    title: "Confirmed Programming",
    description,
    url: "/program",
    type: "website",
    images: [
      {
        url: "/program/opengraph-image",
        width: SOCIAL_PREVIEW_WIDTH,
        height: SOCIAL_PREVIEW_HEIGHT,
        alt: "2026 Program archive for Blockchain Week - UNGA Edition",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Confirmed Programming",
    description,
    images: ["/program/opengraph-image"],
  },
};

export default function ProgramPage() {
  const agenda = getProgramAgenda();

  return (
    <>
      <div className="bg-gold px-4 py-3 text-center text-sm font-semibold text-black">
        2026 Program (archive). The 2027 program will be announced soon.
      </div>
      <section className="section-light py-10">
        <div className="mx-auto max-w-5xl px-4 lg:px-8">
          <h2 className="heading-font mb-4 text-2xl text-ink">2027 calendar</h2>
          <p className="mb-6 text-sm text-ink-muted">
            Confirmed 2027 events are added to the Luma calendar as they are announced.
          </p>
          <LumaEmbed />
        </div>
      </section>
      <ProgramSchedule agenda={agenda} />
    </>
  );
}
