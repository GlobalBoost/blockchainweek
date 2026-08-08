"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const STATS = [
  { value: 10, suffix: "", label: "Days of Fire", detail: "Sept 10–19 · UNGA + NYFW" },
  { value: 100, suffix: "+", label: "Events & Runways", detail: "Fashion-Tech + Blockchain" },
  { value: 1000, suffix: "+", label: "Visionaries", detail: "Attending this year" },
  { value: 5000, suffix: "+", label: "Connections", detail: "Made during the week" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function StatsBar() {
  return (
    <section className="section-light border-y border-black/5 py-12 sm:py-14 lg:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 md:grid-cols-4 lg:px-8">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <p className="heading-font text-4xl text-un-blue md:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-ink">{stat.label}</p>
            <p className="mt-1 text-xs text-ink-muted">{stat.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
