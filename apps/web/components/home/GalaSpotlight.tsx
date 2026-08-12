import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TICKET_CHECKOUT } from "@/lib/brand-constants";
import { BrandName } from "@/components/ui/BrandName";

export function GalaSpotlight() {
  return (
    <section id="gala" className="section-light py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d1b2a] shadow-2xl lg:grid lg:grid-cols-2">
          {/* Image – top on mobile, right on desktop */}
          <div className="relative order-1 aspect-[5/6] sm:aspect-[4/5] lg:order-2 lg:aspect-auto lg:min-h-[540px]">
            <Image
              src="/gala/times-square-gala.png"
              alt="Washington Elite Investment Summit & Gala at Times Square, New York City"
              fill
              className="object-cover object-[center_28%]"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2a] via-[#0d1b2a]/20 to-transparent lg:bg-gradient-to-r lg:from-[#0d1b2a] lg:via-[#0d1b2a]/30 lg:to-transparent" />
            <p className="absolute bottom-4 left-4 text-xs font-medium uppercase tracking-[0.2em] text-white/60 lg:hidden">
              Times Square · NYC
            </p>
          </div>

          {/* Content */}
          <div className="order-2 flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:order-1 lg:px-12 lg:py-14">
            <SectionHeader
              theme="dark"
              eyebrow="Black-Tie UNGA Event"
              title="Washington Elite Investment Summit & Gala"
              subtitle={
                <>
                  September 18 · Times Square · The most exclusive night of <BrandName /> 2026
                </>
              }
              gold
              align="left"
              className="mb-6 sm:mb-8"
            />
            <p className="max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
              High-net-worth investors, heads of state, blockchain leaders, and fashion icons come together
              for an unforgettable evening at the heart of New York City.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-white/70 sm:text-base">
              {[
                "Black-tie networking with world leaders & investors",
                "Premium seating and VIP lounge access",
                "Times Square – the most iconic venue in NYC",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-gold">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={TICKET_CHECKOUT.vip}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center justify-center rounded-full bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-gold/90"
            >
              Get Gala Tickets (VIP Only)
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
