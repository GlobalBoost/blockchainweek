import Image from "next/image";
import galleryData from "@/content/gallery.json";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function ExperienceMosaic() {
  const images = galleryData as { src: string; alt: string }[];

  return (
    <section id="runway" className="section-dark scroll-mt-24 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeader
          eyebrow="NYFW × Blockchain Runway"
          title="10 Days of Fire"
          subtitle="Where New York Fashion Week meets on-chain innovation – runways, panels, and the Fashion-Tech Summit live during UNGA week."
          theme="dark"
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {images.map((img, index) => (
            <div
              key={img.src}
              className={`relative overflow-hidden rounded-xl ${
                index === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={index === 0}
                quality={index === 0 ? 90 : 75}
                className="object-cover transition duration-500 hover:scale-105"
                sizes={index === 0 ? "(max-width:768px) 100vw, 50vw" : "(max-width:768px) 50vw, 25vw"}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
