const STATS = [
  { value: "6", label: "Days", detail: "Sept 13-18 · UNGA Week" },
  { value: "100+", label: "Events & Runways", detail: "Fashion-Tech + Blockchain" },
  { value: "1000+", label: "Visionaries", detail: "Attending this year" },
  { value: "5000+", label: "Connections", detail: "Made during the week" },
];

export function StatsBar() {
  return (
    <section className="section-light border-y border-black/5 py-12 sm:py-14 lg:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 md:grid-cols-4 lg:px-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="heading-font text-4xl text-un-blue md:text-5xl">{stat.value}</p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-ink">{stat.label}</p>
            <p className="mt-1 text-xs text-ink-muted">{stat.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
