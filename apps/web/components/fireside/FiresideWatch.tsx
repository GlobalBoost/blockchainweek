"use client";

import { useEffect, useState } from "react";
import { firesideCountdownParts, getFiresidePhase, type FiresidePhase } from "@/lib/fireside";
import { YOUTUBE_VIDEO_ID } from "@/lib/brand-constants";

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function FiresideWatch({ initialPhase }: { initialPhase: FiresidePhase }) {
  const [phase, setPhase] = useState(initialPhase);
  const [countdown, setCountdown] = useState(() => firesideCountdownParts());

  useEffect(() => {
    const tick = () => {
      setPhase(getFiresidePhase());
      setCountdown(firesideCountdownParts());
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const showPlayer = YOUTUBE_VIDEO_ID.length > 0;

  return (
    <section id="watch" className="scroll-mt-28 bg-[#0a0a0f] px-4 pb-16 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.22em] text-gold">
          {phase === "replay" ? "Watch the replay" : "Watch"}
        </p>
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#0d1b2a]">
          {showPlayer ? (
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}`}
              title="The Human Future: AI, Peace and The Next United Nations"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/fireside/poster.jpeg"
                alt="The Human Future fireside conversation poster"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[#0d1b2a]/55" />
              <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white">
                {phase === "before" ? (
                  <>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Starts in</p>
                    <p className="heading-font mt-3 text-3xl sm:text-5xl">
                      {countdown.days}d {pad(countdown.hours)}h {pad(countdown.minutes)}m {pad(countdown.seconds)}s
                    </p>
                    <p className="mt-4 max-w-md text-sm text-white/80 sm:text-base">
                      The live stream will appear here. Register on Luma to get a reminder.
                    </p>
                  </>
                ) : (
                  <p className="max-w-md text-sm text-white/85 sm:text-base">
                    The live stream will appear here once the YouTube video is connected.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
        {phase === "live" ? (
          <p className="mt-4 text-center text-sm text-white/70">
            Also streaming live on X, YouTube, Facebook, Instagram and LinkedIn.
          </p>
        ) : null}
      </div>
    </section>
  );
}
