import Link from "next/link";
import { Bitcoin, Cpu, Fingerprint, Rocket, Sparkles, Zap } from "lucide-react";
import { TICKETS_ANCHOR } from "@/lib/brand-constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getThemes } from "@/lib/content";

const ICONS: Record<string, React.ReactNode> = {
  bitcoin: <Bitcoin className="h-8 w-8" />,
  ai: <Cpu className="h-8 w-8" />,
  space: <Rocket className="h-8 w-8" />,
  fashion: <Sparkles className="h-8 w-8" />,
  energy: <Zap className="h-8 w-8" />,
  identity: <Fingerprint className="h-8 w-8" />,
};

export function KeyThemesSection() {
  const themes = getThemes();

  return (
    <section id="key-themes" className="section-dark py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader
          eyebrow="2026 Focus Areas"
          title="The Convergence of Tomorrow's Biggest Industries"
          subtitle="Where the future of humanity is being built – live during UNGA and New York Fashion Week"
          theme="dark"
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme) => (
            <div
              key={theme.id}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-un-blue/50"
            >
              <div className="text-un-blue">{ICONS[theme.id]}</div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-fashion">{theme.subtitle}</p>
              <h3 className="mt-2 text-xl font-bold">{theme.title}</h3>
              <p className="mt-3 text-sm text-white/70">{theme.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href={TICKETS_ANCHOR}
            className="rounded-full bg-un-blue px-8 py-3 text-sm font-bold uppercase transition hover:bg-un-blue/90"
          >
            Register for 2026
          </Link>
        </div>
      </div>
    </section>
  );
}
