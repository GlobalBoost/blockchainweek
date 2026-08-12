import Image from "next/image";
import type { TeamMember } from "@/lib/types";
import { emphasizeBrand } from "@/components/ui/BrandName";

export function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-square overflow-hidden bg-[#0d1b2a]">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            style={{ objectPosition: member.photoPosition ?? "center top" }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl font-bold text-white/20">
            {member.name.charAt(0)}
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0d1b2a]/80 to-transparent" />
      </div>
      <div className="p-6 sm:p-7">
        <h3 className="text-xl font-bold text-ink">{member.name}</h3>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-un-blue">{member.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{emphasizeBrand(member.bio)}</p>
      </div>
    </article>
  );
}
