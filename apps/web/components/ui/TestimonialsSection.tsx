import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getTestimonials } from "@/lib/content";

export function TestimonialsSection() {
  const testimonials = getTestimonials();

  return (
    <section className="section-dark py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader theme="dark" title="What leaders are saying" className="mb-12" />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.name}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              {item.photo && (
                <div className="relative mb-5 h-16 w-16 overflow-hidden rounded-full border border-white/10">
                  <Image
                    src={item.photo}
                    alt={item.name}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              )}
              <blockquote className="flex-1 text-sm leading-relaxed text-white/80">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-white/10 pt-4">
                <p className="font-semibold text-white">{item.name}</p>
                <p className="mt-1 text-xs text-muted">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
