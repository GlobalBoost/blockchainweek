import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { BrandName } from "@/components/ui/BrandName";
import { cn } from "@/lib/utils";
import { TICKETS_SECTION_HASH } from "@/lib/brand-constants";
import type { ProgramConference, ProgramEvent } from "@/lib/types";

interface ProgramScheduleProps {
  intro: string;
  events: ProgramEvent[];
  conference: ProgramConference;
}

interface SchedulePhase {
  id: string;
  label: string;
  range: string;
  eventIds: string[];
}

const PHASES: SchedulePhase[] = [
  {
    id: "kickoff",
    label: "Week Kickoff",
    range: "Sep 10–12",
    eventIds: ["orbital-runway", "meetup", "marquee-spotlight"],
  },
  {
    id: "unga-week",
    label: "UNGA Week",
    range: "Sep 14–15",
    eventIds: ["multistakeholder-forum", "cryptomondays", "tech-tuesdays"],
  },
  {
    id: "closing",
    label: "Closing Week",
    range: "Sep 18–19",
    eventIds: ["washington-elite-gala", "pause-the-world"],
  },
];

const CONFERENCE_EVENT_IDS = ["maha-wednesday", "bitcoinpalooza"];

function parseDescription(description: string) {
  if (!description.includes(" · ")) {
    return { summary: description, venue: null };
  }
  const parts = description.split(" · ");
  return { venue: parts[parts.length - 1], summary: parts.slice(0, -1).join(" · ") };
}

function nodeColor(event: ProgramEvent) {
  if (event.variant === "bitcoin") return "border-gold bg-gold";
  if (event.featured) return "border-un-blue bg-un-blue";
  return "border-white/40 bg-[#0a0a0f]";
}

function EventCard({ event }: { event: ProgramEvent }) {
  const { venue, summary } = parseDescription(event.description);
  const isBitcoin = event.variant === "bitcoin";
  const isFlagship = event.id === "washington-elite-gala";

  return (
    <article
      className={cn(
        "min-w-0 rounded-2xl border p-5 sm:p-6 lg:p-7",
        isBitcoin
          ? "border-gold/30 bg-gradient-to-br from-[#1a1408] to-[#0d1b2a]"
          : isFlagship
            ? "border-gold/25 bg-gradient-to-br from-[#121a24] to-[#0d1b2a]"
            : "border-white/10 bg-white/[0.04]"
      )}
    >
      <div className="mb-4 flex flex-wrap items-center gap-3 sm:hidden">
        <div className="rounded-lg bg-white/10 px-3 py-1.5 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">{event.day}</p>
          <p className="text-sm font-bold text-un-blue">{event.date}</p>
        </div>
        {event.time && (
          <span className="inline-flex items-center gap-1.5 text-xs text-white/60">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            {event.time}
          </span>
        )}
      </div>

      <span
        className={cn(
          "inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]",
          isBitcoin ? "bg-gold/20 text-gold" : "bg-un-blue/15 text-un-blue"
        )}
      >
        {event.tag}
      </span>

      {event.logo && (
        <div className="mt-4">
          <Image
            src={event.logo}
            alt={event.logoAlt ?? ""}
            width={180}
            height={44}
            className="h-10 w-auto object-contain brightness-0 invert opacity-90 sm:h-11"
          />
        </div>
      )}

      <h3 className="mt-3 break-words text-lg font-bold leading-snug text-white sm:text-xl">{event.title}</h3>

      {summary && <p className="mt-2 break-words text-sm leading-relaxed text-white/75">{summary}</p>}

      {venue && (
        <p className="mt-3 flex items-start gap-2 text-sm text-white/55">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-un-blue/80" />
          <span className="break-words">{venue}</span>
        </p>
      )}

      {event.details && (
        <p className="mt-4 break-words border-t border-white/10 pt-4 text-sm leading-relaxed text-white/65">
          {event.details}
        </p>
      )}
    </article>
  );
}

function TimelineEvent({ event, isLast }: { event: ProgramEvent; isLast?: boolean }) {
  return (
    <li className={cn("relative", !isLast && "pb-10 sm:pb-12")}>
      <div
        className={cn(
          "absolute top-2 z-10 h-3 w-3 -translate-x-1/2 rounded-full border-2",
          "left-0 sm:left-[116px]",
          nodeColor(event)
        )}
        aria-hidden
      />

      <div className="absolute top-0 hidden w-[92px] text-right sm:block lg:w-[100px]">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/45">{event.day}</p>
        <p className="mt-0.5 text-xl font-bold text-un-blue lg:text-2xl">{event.date}</p>
        {event.time && (
          <p className="mt-2 inline-flex items-center justify-end gap-1 text-[11px] leading-tight text-white/50">
            <Clock className="h-3 w-3 shrink-0" />
            <span>{event.time}</span>
          </p>
        )}
      </div>

      <div className="pl-6 sm:pl-[148px] lg:pl-[156px]">
        <EventCard event={event} />
      </div>
    </li>
  );
}

function TimelineList({ events }: { events: ProgramEvent[] }) {
  if (events.length === 0) return null;

  return (
    <div className="relative">
      <div
        className="absolute bottom-0 top-2 left-0 w-px bg-gradient-to-b from-un-blue/40 via-white/15 to-transparent sm:left-[116px]"
        aria-hidden
      />

      <ol className="relative m-0 list-none p-0">
        {events.map((event, index) => (
          <TimelineEvent key={event.id} event={event} isLast={index === events.length - 1} />
        ))}
      </ol>
    </div>
  );
}

function PhaseBlock({ phase, events }: { phase: SchedulePhase; events: ProgramEvent[] }) {
  const phaseEvents = phase.eventIds
    .map((id) => events.find((e) => e.id === id))
    .filter((e): e is ProgramEvent => Boolean(e));

  if (phaseEvents.length === 0) return null;

  return (
    <div className="mb-16 last:mb-0 sm:mb-20">
      <div className="mb-8 border-b border-white/10 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{phase.range}</p>
        <h3 className="heading-font mt-1 text-2xl text-white sm:text-3xl">{phase.label}</h3>
      </div>

      <TimelineList events={phaseEvents} />
    </div>
  );
}

function ConferenceBlock({
  conference,
  events,
}: {
  conference: ProgramConference;
  events: ProgramEvent[];
}) {
  const conferenceEvents = CONFERENCE_EVENT_IDS.map((id) => events.find((e) => e.id === id)).filter(
    (e): e is ProgramEvent => Boolean(e)
  );

  return (
    <div className="mb-16 sm:mb-20">
      <div className="mb-8 border-b border-white/10 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Sep 16–17</p>
        <h3 className="heading-font mt-1 text-2xl text-white sm:text-3xl">Flagship Conference</h3>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/65 sm:text-base">{conference.summary}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
        {conference.days.map((day, index) => (
          <div
            key={day.label}
            className={cn(
              "rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:p-6",
              index === 0 && "border-un-blue/25"
            )}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-un-blue">Day {index + 1}</p>
            <h4 className="mt-2 break-words text-base font-bold leading-snug text-white sm:text-lg">{day.label}</h4>
            <p className="mt-4 break-words text-sm leading-relaxed text-white/70">
              <span className="font-semibold text-white/90">Focus: </span>
              {day.focusAreas}
            </p>
            <p className="mt-3 break-words text-sm leading-relaxed text-white/55">{day.description}</p>
          </div>
        ))}
      </div>

      {conferenceEvents.length > 0 && (
        <div className="mt-10 sm:mt-12">
          <TimelineList events={conferenceEvents} />
        </div>
      )}
    </div>
  );
}

const STATS = [
  { value: "10", label: "Days" },
  { value: "12+", label: "Official Events" },
  { value: "3", label: "Iconic Venues" },
] as const;

export function ProgramSchedule({ intro, events, conference }: ProgramScheduleProps) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0d1b2a] via-[#0a1628] to-[#0a0a0f] py-16 sm:py-20 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,158,219,0.12),_transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(201,162,39,0.08),_transparent_50%)]" />

        <div className="relative mx-auto max-w-5xl px-4 text-center lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-un-blue">
            September 10–19, 2026 · New York City
          </p>
          <h1 className="heading-font mt-4 text-4xl leading-tight text-runway-white sm:text-5xl lg:text-6xl">
            Official Events Schedule
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/75 sm:text-xl">
            The complete 10-day program for <BrandName /> — from opening night through the flagship conference, gala,
            and closing concert.
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-white/60 sm:text-lg">{intro}</p>

          <dl className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-3 sm:mt-12 sm:gap-5">
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-center backdrop-blur-sm sm:px-6 sm:py-6"
              >
                <dt className="heading-font text-2xl text-un-blue sm:text-4xl">{value}</dt>
                <dd className="mt-1 text-[10px] font-medium uppercase tracking-wider text-white/50 sm:text-sm">
                  {label}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={TICKETS_SECTION_HASH}
              className="inline-flex items-center justify-center rounded-full bg-gold px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-gold/90"
            >
              Secure Your Ticket
            </Link>
            <a
              href="#schedule"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:border-un-blue hover:text-un-blue"
            >
              View Schedule
            </a>
          </div>
        </div>
      </section>

      <section id="schedule" className="section-dark py-14 sm:py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-4 lg:px-8">
          {PHASES.slice(0, 2).map((phase) => (
            <PhaseBlock key={phase.id} phase={phase} events={events} />
          ))}

          <ConferenceBlock conference={conference} events={events} />

          <PhaseBlock phase={PHASES[2]} events={events} />
        </div>
      </section>
    </>
  );
}
