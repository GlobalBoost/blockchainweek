"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SpeakerCard } from "./SpeakerCard";
import { themeLabel } from "@/lib/content";
import { consumeSpeakersRestore, saveSpeakersReturnState } from "@/lib/speakers-navigation";
import type { Speaker, Theme } from "@/lib/types";

const THEMES: Theme[] = [
  "bitcoin",
  "stablecoin",
  "ai",
  "space",
  "fashion",
  "policy",
  "energy",
  "investment",
  "identity",
];

export function SpeakerGrid({ speakers }: { speakers: Speaker[] }) {
  const [query, setQuery] = useState("");
  const [activeTheme, setActiveTheme] = useState<Theme | "all">("all");

  useEffect(() => {
    let scrollFrame: number | undefined;
    const restoreFrame = window.requestAnimationFrame(() => {
      const state = consumeSpeakersRestore();
      if (!state || state.path !== "/speakers") return;
      setQuery(state.query ?? "");
      setActiveTheme((state.activeTheme as Theme | "all") ?? "all");
      scrollFrame = window.requestAnimationFrame(() => {
        window.scrollTo({
          top: state.scrollY ?? 0,
          behavior: "instant" in window ? ("instant" as ScrollBehavior) : "auto",
        });
      });
    });
    return () => {
      window.cancelAnimationFrame(restoreFrame);
      if (scrollFrame !== undefined) window.cancelAnimationFrame(scrollFrame);
    };
  }, []);

  const filtered = useMemo(() => {
    return speakers.filter((s) => {
      const matchesQuery =
        !query ||
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.company.toLowerCase().includes(query.toLowerCase()) ||
        s.title.toLowerCase().includes(query.toLowerCase());
      const matchesTheme = activeTheme === "all" || s.themes.includes(activeTheme);
      return matchesQuery && matchesTheme;
    });
  }, [speakers, query, activeTheme]);

  const saveReturnState = () => {
    saveSpeakersReturnState({
      path: "/speakers",
      scrollY: window.scrollY,
      query,
      activeTheme,
      listSlugs: filtered.map((speaker) => speaker.slug),
    });
  };

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            type="search"
            placeholder="Search speakers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-full border border-black/10 bg-white py-2 pl-10 pr-4 text-sm text-ink outline-none focus:border-un-blue"
          />
        </div>
        <p className="text-sm text-ink-muted">{filtered.length} speakers</p>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveTheme("all")}
          className={`rounded-full px-4 py-1.5 text-sm transition ${
            activeTheme === "all" ? "bg-un-blue text-white" : "border border-black/10 bg-white text-ink/70 hover:border-un-blue/30"
          }`}
        >
          All
        </button>
        {THEMES.map((theme) => (
          <button
            key={theme}
            type="button"
            onClick={() => setActiveTheme(theme)}
            className={`rounded-full px-4 py-1.5 text-sm transition ${
              activeTheme === theme ? "bg-un-blue text-white" : "border border-black/10 bg-white text-ink/70 hover:border-un-blue/30"
            }`}
          >
            {themeLabel(theme)}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((speaker) => (
          <div key={speaker.slug} className="h-full">
            <SpeakerCard speaker={speaker} onNavigate={saveReturnState} />
          </div>
        ))}
      </div>
    </div>
  );
}
