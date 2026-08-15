/**
 * Generate redirect map from old WordPress speaker URLs
 * Run: npx tsx scripts/generate-redirects.ts
 */
import fs from "fs";
import path from "path";

const speakers = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "content/speakers.json"), "utf8")
) as { slug: string }[];

const redirects: { source: string; destination: string; permanent: boolean }[] = [];

for (const speaker of speakers) {
  redirects.push({
    source: `/speakers/${speaker.slug}`,
    destination: `/${speaker.slug}`,
    permanent: true,
  });
  redirects.push({
    source: `/${speaker.slug}-2`,
    destination: `/${speaker.slug}`,
    permanent: true,
  });
}

const staticRedirects = [
  { source: "/partner", destination: "/partnerships", permanent: true },
  { source: "/partnership", destination: "/partnerships", permanent: true },
  { source: "/sponsorship", destination: "/partnerships", permanent: true },
  { source: "/partners", destination: "/partnerships", permanent: true },
  { source: "/home", destination: "/", permanent: true },
  { source: "/the-conference", destination: "/program", permanent: true },
  { source: "/conference", destination: "/program", permanent: true },
];

const all = [...staticRedirects, ...redirects];
fs.writeFileSync(
  path.join(process.cwd(), "redirects.json"),
  JSON.stringify(all, null, 2)
);
console.log(`Generated ${all.length} redirects → redirects.json`);
