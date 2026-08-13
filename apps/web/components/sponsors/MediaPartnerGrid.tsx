import Image from "next/image";
import { getMediaPartners } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

export function MediaPartnerGrid() {
  const partners = getMediaPartners();
  if (!partners.length) return null;

  return (
    <section className="section-dark py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader eyebrow="Press & Media" title="MEDIA" gold theme="dark" />
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {partners.map((partner) => {
            const logo = (
              <Image
                src={partner.logo}
                alt={partner.name}
                width={100}
                height={48}
                className={cn("max-h-10 w-auto object-contain", partner.logoClassName)}
              />
            );

            return (
              <div
                key={partner.logo}
                className="flex h-16 items-center justify-center rounded-lg bg-white p-2"
              >
                {partner.url ? (
                  <a
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full w-full items-center justify-center"
                    aria-label={partner.name}
                  >
                    {logo}
                  </a>
                ) : (
                  logo
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
