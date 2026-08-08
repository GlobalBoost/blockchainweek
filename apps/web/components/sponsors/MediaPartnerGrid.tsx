import Image from "next/image";
import { getMediaPartners } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function MediaPartnerGrid() {
  const partners = getMediaPartners();
  if (!partners.length) return null;

  return (
    <section className="section-dark py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader eyebrow="Press & Media" title="MEDIA" gold theme="dark" />
        <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {partners.map((partner) => (
            <div key={partner.logo} className="flex h-16 items-center justify-center rounded-lg bg-white p-2">
              <Image src={partner.logo} alt={partner.name} width={100} height={48} className="max-h-10 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
