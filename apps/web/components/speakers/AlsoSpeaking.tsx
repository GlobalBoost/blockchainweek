"use client";

import { useEffect, useState } from "react";
import { SpeakerCard } from "@/components/speakers/SpeakerCard";
import { pickAlsoSpeakingSpeakers } from "@/lib/speakers-navigation";
import type { Speaker } from "@/lib/types";

export function AlsoSpeaking({
  currentSlug,
  speakers,
  fallbackSpeakers,
}: {
  currentSlug: string;
  speakers: Speaker[];
  fallbackSpeakers: Speaker[];
}) {
  const [items, setItems] = useState(fallbackSpeakers);

  useEffect(() => {
    setItems(pickAlsoSpeakingSpeakers(speakers, currentSlug, 4));
  }, [currentSlug, speakers]);

  if (items.length === 0) return null;

  return (
    <div className="mt-12 border-t border-white/10 pt-12">
      <h2 className="heading-font mb-8 text-2xl sm:text-3xl">Also speaking</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((speaker) => (
          <div key={speaker.slug} className="h-full">
            <SpeakerCard speaker={speaker} />
          </div>
        ))}
      </div>
    </div>
  );
}
