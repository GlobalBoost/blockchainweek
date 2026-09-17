"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Search, X } from "lucide-react";
import type {
  ProgramAgenda,
  ProgramAgendaDay,
  ProgramAgendaSession,
  ProgramAgendaSpeaker,
} from "@/lib/types";
import { cn } from "@/lib/utils";

function speakerInitials(name: string) {
  const parts = name
    .replace(/\./g, " ")
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => !/^(dr|mr|mrs|ms|prof)$/i.test(part));

  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function SpeakerAvatar({ speaker }: { speaker: ProgramAgendaSpeaker }) {
  const content = speaker.photo ? (
    <Image
      src={speaker.photo}
      alt=""
      width={28}
      height={28}
      unoptimized
      className="h-full w-full object-cover"
    />
  ) : (
    <span className="text-[10px] font-bold tracking-wide text-un-blue">{speakerInitials(speaker.name)}</span>
  );

  const avatar = (
    <span
      className={cn(
        "inline-flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/15",
        speaker.photo ? "bg-white/10" : "bg-un-blue/20"
      )}
      aria-hidden
    >
      {content}
    </span>
  );

  const label = <span className="min-w-0 max-w-[12rem] truncate sm:max-w-[16rem]">{speaker.name}</span>;

  if (speaker.slug) {
    return (
      <Link
        href={`/${speaker.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1 pr-2.5 text-sm text-white/80 transition hover:border-un-blue/40 hover:bg-un-blue/10 hover:text-un-blue sm:pr-3"
      >
        {avatar}
        {label}
      </Link>
    );
  }

  return (
    <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] py-1 pl-1 pr-2.5 text-sm text-white/70 sm:pr-3">
      {avatar}
      {label}
    </span>
  );
}

const KIND_LABEL: Record<string, string> = {
  panel: "Panel",
  keynote: "Keynote",
  fireside: "Fireside",
  performance: "Performance",
  host: "Program",
  break: "Break",
  lunch: "Lunch",
};

function kindClass(kind: string) {
  if (kind === "keynote") return "bg-gold/15 text-gold border-gold/20";
  if (kind === "performance") return "bg-un-blue/15 text-un-blue border-un-blue/25";
  if (kind === "panel" || kind === "fireside") return "bg-white/8 text-white/75 border-white/10";
  if (kind === "break" || kind === "lunch") return "bg-white/5 text-white/45 border-white/8";
  return "bg-white/5 text-white/50 border-white/8";
}

function parseClock(value: string) {
  const [hRaw, mRaw] = value.split(":").map(Number);
  const hours = hRaw === 24 ? 24 : hRaw;
  const minutes = mRaw || 0;
  return { hours, minutes };
}

function formatClock(value: string) {
  const { hours, minutes } = parseClock(value);
  if (hours === 24) {
    return { primary: "12:00", period: "AM" };
  }
  const period = hours >= 12 ? "PM" : "AM";
  const h12 = hours % 12 || 12;
  return {
    primary: `${h12}:${minutes.toString().padStart(2, "0")}`,
    period,
  };
}

function SessionTime({ start, end }: { start: string; end: string }) {
  const from = formatClock(start);
  const to = formatClock(end);

  return (
    <div className="min-w-0 font-variant-numeric tabular-nums sm:min-w-[6.25rem]">
      <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
        <span className="text-base font-semibold tracking-tight text-white sm:text-lg">{from.primary}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-un-blue">{from.period}</span>
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/35 sm:hidden">–</span>
        <span className="text-sm font-medium tracking-tight text-white/55 sm:hidden">
          {to.primary}
          <span className="ml-1 text-[10px] font-semibold uppercase tracking-[0.14em]">{to.period}</span>
        </span>
      </div>
      <div className="mt-0.5 hidden items-baseline gap-1.5 text-white/40 sm:flex">
        <span className="text-[10px] font-medium uppercase tracking-[0.16em]">to</span>
        <span className="text-sm font-medium tracking-tight">{to.primary}</span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">{to.period}</span>
      </div>
    </div>
  );
}

function SessionRow({
  session,
  isFirst,
  isLast,
}: {
  session: ProgramAgendaSession;
  isFirst: boolean;
  isLast: boolean;
}) {
  const isBreak = session.kind === "break" || session.kind === "lunch";
  const speakers = session.speakers.filter(Boolean);

  return (
    <article
      id={`session-${session.id}`}
      className={cn(
        "relative grid scroll-mt-[12.5rem] grid-cols-1 gap-3 py-4 sm:scroll-mt-36 sm:grid-cols-[auto_1fr] sm:gap-6 sm:py-5",
        isBreak && "opacity-75"
      )}
    >
      {/* Timeline rail — desktop/tablet */}
      <div className="relative hidden flex-col items-center pt-2 sm:flex">
        {!isFirst && (
          <span className="absolute bottom-[calc(100%-0.5rem)] left-1/2 top-0 w-px -translate-x-1/2 bg-white/10" />
        )}
        {!isLast && (
          <span className="absolute bottom-0 left-1/2 top-3 w-px -translate-x-1/2 bg-white/10" />
        )}
        <span
          className={cn(
            "relative z-10 h-2.5 w-2.5 shrink-0 rounded-full border-2",
            isBreak
              ? "border-white/25 bg-[#0a0a0f]"
              : session.kind === "keynote"
                ? "border-gold bg-gold"
                : session.kind === "performance"
                  ? "border-un-blue bg-un-blue"
                  : "border-un-blue/70 bg-[#0a0a0f]"
          )}
          aria-hidden
        />
      </div>

      <div className="min-w-0 grid gap-3 sm:grid-cols-[6.5rem_1fr] sm:gap-5 lg:grid-cols-[7rem_1fr]">
        <div className="flex items-center gap-3 sm:block">
          <span
            className={cn(
              "h-2 w-2 shrink-0 rounded-full border-2 sm:hidden",
              isBreak
                ? "border-white/25 bg-transparent"
                : session.kind === "keynote"
                  ? "border-gold bg-gold"
                  : session.kind === "performance"
                    ? "border-un-blue bg-un-blue"
                    : "border-un-blue/70 bg-transparent"
            )}
            aria-hidden
          />
          {session.time === "By invitation" ? (
            <p className="text-sm font-semibold uppercase tracking-wider text-white/70">By invitation</p>
          ) : (
            <SessionTime start={session.start} end={session.end} />
          )}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]",
                kindClass(session.kind)
              )}
            >
              {KIND_LABEL[session.kind] ?? session.kind}
            </span>
          </div>
          <h4
            className={cn(
              "mt-2 break-words text-base font-semibold leading-snug text-white sm:text-lg",
              isBreak && "font-medium text-white/70"
            )}
          >
            {session.title}
          </h4>
          {session.description && (
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/60">{session.description}</p>
          )}
          {speakers.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
              {speakers.map((speaker) => (
                <SpeakerAvatar key={`${session.id}-${speaker.name}`} speaker={speaker} />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function DayPanel({ day }: { day: ProgramAgendaDay }) {
  return (
    <div id={`agenda-${day.id}`} className="scroll-mt-[12.5rem] sm:scroll-mt-36">
      <div className="mb-4 flex flex-col gap-3 border-b border-white/10 pb-5 sm:mb-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{day.dateLabel}</p>
          <h3 className="heading-font mt-1 break-words text-xl text-white sm:text-3xl">{day.label}</h3>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">{day.theme}</p>
        </div>
        <div className="min-w-0 shrink-0 text-left sm:max-w-xs sm:text-right">
          <p className="font-variant-numeric text-sm font-medium tabular-nums text-white/80">{day.hours}</p>
          {day.venue ? (
            <p className="mt-1.5 inline-flex items-start gap-1.5 text-xs leading-snug text-white/45 sm:justify-end">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-un-blue/80" />
              <span className="min-w-0 break-words">{day.venue}</span>
            </p>
          ) : null}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-3 py-1 sm:px-6 sm:py-2">
        {day.sessions.map((session, index) => (
          <SessionRow
            key={session.id}
            session={session}
            isFirst={index === 0}
            isLast={index === day.sessions.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

function normalizeQuery(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Whole-word / whole-phrase match so "sam" does not hit "same" or "Samuel". */
function containsPhrase(haystack: string, phrase: string) {
  const pattern = escapeRegExp(phrase).replace(/\s+/g, "\\s+");
  return new RegExp(`(?:^|[^a-z0-9])${pattern}(?=[^a-z0-9]|$)`, "i").test(haystack);
}

function sessionSearchText(day: ProgramAgendaDay, session: ProgramAgendaSession) {
  // Intentionally omit day.theme – themes often name headliners and would
  // falsely match every session on that day for a speaker search.
  return [
    session.title,
    session.description,
    session.kind,
    KIND_LABEL[session.kind],
    session.time,
    day.label,
    day.dateLabel,
    day.dayShort,
    day.venue,
    ...session.speakers.flatMap((speaker) => [speaker.name, speaker.slug?.replace(/-/g, " ")]),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function sessionMatchesQuery(day: ProgramAgendaDay, session: ProgramAgendaSession, query: string) {
  if (!query) return true;

  const haystack = sessionSearchText(day, session);

  // Prefer the full phrase (e.g. "enyo sam") so both names stay together.
  if (containsPhrase(haystack, query)) return true;

  const terms = query.split(" ").filter(Boolean);
  if (terms.length <= 1) return false;

  // Multi-word fallback: every term must appear as its own word.
  return terms.every((term) => containsPhrase(haystack, term));
}

export function ProgramAgendaSection({ agenda }: { agenda: ProgramAgenda }) {
  const [activeDay, setActiveDay] = useState<string>("all");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const normalizedQuery = normalizeQuery(deferredQuery);
  const stickyRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const visibleDays = useMemo(() => {
    const days = activeDay === "all" ? agenda.days : agenda.days.filter((day) => day.id === activeDay);

    return days
      .map((day) => ({
        ...day,
        sessions: day.sessions.filter((session) => sessionMatchesQuery(day, session, normalizedQuery)),
      }))
      .filter((day) => day.sessions.length > 0);
  }, [activeDay, agenda.days, normalizedQuery]);

  const matchCount = useMemo(
    () => visibleDays.reduce((total, day) => total + day.sessions.length, 0),
    [visibleDays]
  );

  useEffect(() => {
    if (!normalizedQuery) return;

    const frame = window.requestAnimationFrame(() => {
      const results = resultsRef.current;
      const sticky = stickyRef.current;
      if (!results) return;

      const headerOffset = 64; // site header (top-16)
      const stickyHeight = sticky?.offsetHeight ?? 0;
      const offset = headerOffset + stickyHeight + 12;
      const targetTop = results.getBoundingClientRect().top + window.scrollY - offset;
      const delta = Math.abs(window.scrollY - targetTop);

      // Already sitting under the filters with results in view
      if (delta < 24) return;

      window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [normalizedQuery, matchCount, activeDay]);

  return (
    <section id="agenda" className="section-dark border-t border-white/10 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 lg:px-8">
        <div
          ref={stickyRef}
          className="sticky top-16 z-40 -mx-4 mb-8 border-b border-white/10 bg-[var(--bg-primary)]/95 px-4 py-3 backdrop-blur-md sm:py-4 lg:-mx-8 lg:px-8"
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
            <div className="relative order-1 w-full shrink-0 lg:order-2 lg:max-w-sm">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
                aria-hidden
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search speakers, topics…"
                aria-label="Search the agenda"
                className="w-full rounded-full border border-white/15 bg-white/[0.04] py-2.5 pl-10 pr-10 text-sm text-white outline-none placeholder:text-white/40 transition focus:border-un-blue focus:bg-white/[0.06] [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-white/45 transition hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              ) : null}
            </div>

            <div className="-mx-4 order-2 overflow-x-auto overscroll-x-contain px-4 [scrollbar-width:none] lg:order-1 lg:mx-0 lg:min-w-0 lg:flex-1 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
              <div className="flex w-max flex-nowrap gap-2 lg:w-auto lg:flex-wrap">
                <button
                  type="button"
                  onClick={() => setActiveDay("all")}
                  className={cn(
                    "shrink-0 rounded-full px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider transition sm:px-4 sm:text-xs",
                    activeDay === "all"
                      ? "bg-un-blue text-white"
                      : "border border-white/15 text-white/70 hover:border-un-blue hover:text-un-blue"
                  )}
                >
                  All days
                </button>
                {agenda.days.map((day) => (
                  <button
                    key={day.id}
                    type="button"
                    onClick={() => setActiveDay(day.id)}
                    className={cn(
                      "shrink-0 rounded-full px-3.5 py-2 text-[11px] font-bold uppercase tracking-wider transition sm:px-4 sm:text-xs",
                      activeDay === day.id
                        ? "bg-un-blue text-white"
                        : "border border-white/15 text-white/70 hover:border-un-blue hover:text-un-blue"
                    )}
                  >
                    {day.id === "palooza"
                      ? "Palooza"
                      : day.id === "orbital"
                        ? "Orbital"
                        : day.id === "marquee"
                          ? "Marquee"
                          : day.id === "peace"
                            ? "Peace"
                            : day.dayShort}{" "}
                    {day.dateLabel.replace("Sep ", "")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {normalizedQuery ? (
            <p className="mt-3 text-sm text-white/50">
              {matchCount === 0
                ? "No sessions match your search."
                : `${matchCount} session${matchCount === 1 ? "" : "s"} match “${deferredQuery.trim()}”`}
            </p>
          ) : null}
        </div>

        <div ref={resultsRef}>
          {visibleDays.length > 0 ? (
            <div className="space-y-12 sm:space-y-14">
              {visibleDays.map((day) => (
                <DayPanel key={day.id} day={day} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-14 text-center">
              <p className="text-base font-medium text-white/80">No matching sessions</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-white/50">
                Try another speaker name, topic keyword, venue, or session type like panel, keynote, or
                performance.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setActiveDay("all");
                }}
                className="mt-6 rounded-full border border-white/20 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white/80 transition hover:border-un-blue hover:text-un-blue"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

