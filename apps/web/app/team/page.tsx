import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import { getTeam } from "@/lib/content";
import { EVENT_DATES, EVENT_LOCATION, BRAND_NAME } from "@/lib/brand-constants";

export const metadata: Metadata = {
  title: "Team",
  description: `Meet the team behind ${BRAND_NAME} 2026.`,
};

export default function TeamPage() {
  const team = getTeam();

  return (
    <>
      <PageHero
        eyebrow={`${EVENT_DATES} · ${EVENT_LOCATION}`}
        title="Meet the Team"
        subtitle="Our team combines decades of experience in blockchain, event production, media, and high-level diplomacy. Together we create unforgettable experiences that connect world leaders, corporations, investors, and innovators during UNGA + NYFW."
      />

      <section className="section-light py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeader eyebrow="Our Core Team" title="The People Behind the Week" align="left" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <TeamMemberCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center lg:px-8">
          <SectionHeader
            theme="dark"
            title="Join Our Visionary Team"
            subtitle="We are always looking for passionate individuals who share our commitment to excellence and innovation during the most important week in blockchain."
          />
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-black transition hover:bg-gold/90"
          >
            Apply to Join the Team
          </Link>
        </div>
      </section>
    </>
  );
}
