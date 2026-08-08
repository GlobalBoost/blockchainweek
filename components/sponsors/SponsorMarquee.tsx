import Image from "next/image";
import { getSponsors } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function SponsorMarquee() {
  const sponsors = getSponsors();
  if (!sponsors.length) return null;
  const doubled = [...sponsors, ...sponsors];

  return (
    <section className="section-light overflow-hidden py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader eyebrow="Partners" title="Proudly Powered By" theme="light" />
      </div>
      <div className="relative flex overflow-hidden">
        <div className="animate-marquee flex shrink-0 items-center gap-16 px-8">
          {doubled.map((sponsor, i) => (
            <div key={`${sponsor.name}-${i}`} className="flex h-16 w-40 shrink-0 items-center justify-center rounded-lg bg-white p-3">
              <Image src={sponsor.logo} alt={sponsor.name} width={160} height={64} className="max-h-12 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
