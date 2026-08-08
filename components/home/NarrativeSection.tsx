import { SectionHeader } from "@/components/ui/SectionHeader";

export function NarrativeSection() {
  return (
    <section className="section-light py-20">
      <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
        <SectionHeader
          eyebrow="UNGA + NYFW 2026"
          title="UNGA Meets NYFW. The Most Powerful Week in Blockchain Is Back."
          theme="light"
        />
        <p className="text-lg leading-relaxed text-ink/80">
          10 days of Bitcoin & Energy breakthroughs, AI agents, Space, and the biggest Fashion-Tech Summit ever – all coinciding with the United Nations General Assembly and New York Fashion Week.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink/80">
          Plus the exclusive Washington Elite Investment Summit & Gala on September 18th in Times Square.
        </p>
      </div>
    </section>
  );
}
