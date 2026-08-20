import Link from "next/link";
import Image from "next/image";
import { themeLabel } from "@/lib/content";
import type { Speaker } from "@/lib/types";

export function SpeakerCard({
  speaker,
  onNavigate,
}: {
  speaker: Speaker;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={`/${speaker.slug}`}
      {...(onNavigate ? { onClick: onNavigate } : {})}
      className="group flex h-full flex-col rounded-xl border border-black/10 bg-white shadow-sm transition hover:border-un-blue/40 hover:shadow-md"
    >
      <div className="relative aspect-[4/5] shrink-0 overflow-hidden rounded-t-xl bg-gray-100">
        <Image
          src={speaker.photo || "/logo.png"}
          alt={speaker.name}
          fill
          unoptimized
          loading="eager"
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="font-bold text-ink">{speaker.name}</p>
        <p className="mt-1 min-h-[2.5rem] text-sm text-un-blue line-clamp-2">{speaker.title}</p>
        <p className="mt-1 min-h-[1rem] text-xs text-ink-muted line-clamp-2">
          {speaker.company || "\u00A0"}
        </p>
        {speaker.themes.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1 pt-3">
            {speaker.themes.slice(0, 2).map((t) => (
              <span key={t} className="rounded-full bg-un-blue/10 px-2 py-0.5 text-xs text-un-blue">
                {themeLabel(t)}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
