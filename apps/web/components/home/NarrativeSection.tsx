import { SectionHeader } from "@/components/ui/SectionHeader";

export function NarrativeSection() {
  return (
    <section className="section-light py-20">
      <div className="mx-auto max-w-4xl px-4 text-center lg:px-8">
        <SectionHeader
          eyebrow="UNGA 2027"
          title="Six Days in Times Square. The Most Powerful Week in Blockchain Is Back."
          theme="light"
        />
        <p className="text-lg leading-relaxed text-ink/80">
          Six days of Bitcoin and energy breakthroughs, AI, space, and fashion-tech, coinciding with the United Nations General Assembly.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-ink/80">
          Plus the exclusive Washington Elite Investment Summit & Gala. Date to be announced.
        </p>
      </div>
    </section>
  );
}
