import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { LUMA_PUBLIC_URL } from "@/lib/luma";
import { LumaEmbed } from "@/components/events/LumaEmbed";
import { EVENT_DATES, EVENT_LOCATION } from "@/lib/brand-constants";

const EVENT_TYPES = ["Workshops", "Keynotes", "Runways", "Galas", "Networking"];

export function LumaCTA() {
  return (
    <section id="live-calendar" className="section-light py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0d1b2a] to-[#0a0a0f] shadow-2xl lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          {/* Copy + actions */}
          <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-un-blue">
              Live Event Calendar
            </p>
            <h2 className="heading-font mt-3 text-3xl leading-tight text-white sm:text-4xl">
              Everything Happening During UNGA + NYFW
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">
              Side events, panels, runways, and networking nights across New York City – updated live on
              Luma.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {EVENT_TYPES.map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/70"
                >
                  {type}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={LUMA_PUBLIC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-un-blue px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-un-blue/90"
              >
                <CalendarDays className="h-4 w-4" />
                Open Full Calendar
              </a>
              <a
                href={LUMA_PUBLIC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:border-un-blue hover:text-un-blue"
              >
                <ExternalLink className="h-4 w-4" />
                View on Luma
              </a>
            </div>

            <div className="mt-8 space-y-2 border-t border-white/10 pt-6 text-sm text-white/60">
              <p className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 shrink-0 text-un-blue" />
                {EVENT_DATES}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-un-blue" />
                {EVENT_LOCATION}
              </p>
            </div>
          </div>

          {/* Calendar embed */}
          <div className="border-t border-white/10 bg-white lg:border-t-0 lg:border-l lg:border-white/10">
            <div className="flex items-center justify-between border-b border-black/5 px-4 py-3 sm:px-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/45">
                Upcoming on Luma
              </p>
              <a
                href={LUMA_PUBLIC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-un-blue hover:underline"
              >
                See all →
              </a>
            </div>
            <LumaEmbed compact />
          </div>
        </div>
      </div>
    </section>
  );
}
