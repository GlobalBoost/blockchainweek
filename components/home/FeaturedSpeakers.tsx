"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SpeakerCard } from "@/components/speakers/SpeakerCard";
import { saveSpeakersReturnState } from "@/lib/speakers-navigation";
import type { Speaker } from "@/lib/types";

export function FeaturedSpeakers({ speakers }: { speakers: Speaker[] }) {
  const saveReturnState = () => {
    saveSpeakersReturnState({
      path: "/",
      scrollY: window.scrollY,
    });
  };

  return (
    <section className="section-light py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader
          eyebrow="Our speakers"
          title="Meet the Visionaries"
          subtitle="Bitcoin OGs, AI pioneers, policymakers and founders shaping the future"
          theme="light"
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {speakers.map((speaker, i) => (
            <motion.div
              key={speaker.slug}
              className="h-full"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <SpeakerCard speaker={speaker} onNavigate={saveReturnState} />
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/speakers"
            className="rounded-full border border-un-blue px-8 py-3 text-sm font-bold uppercase tracking-wider text-un-blue transition hover:bg-un-blue hover:text-white"
          >
            See All Speakers
          </Link>
        </div>
      </div>
    </section>
  );
}
