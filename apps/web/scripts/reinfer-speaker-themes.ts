import fs from "fs";
import speakers from "../content/speakers.json";
import { inferSpeakerThemes } from "../lib/speaker-themes";

const updated = speakers.map((speaker) => ({
  ...speaker,
  themes: inferSpeakerThemes(speaker),
}));

const counts: Record<string, number> = {};
for (const s of updated) {
  for (const t of s.themes) counts[t] = (counts[t] || 0) + 1;
}

console.log("Theme counts:", counts);
console.log(
  "\nStablecoin speakers:\n" +
    updated
      .filter((s) => s.themes.includes("stablecoin"))
      .map((s) => `  ${s.slug}: [${s.themes.join(", ")}]`)
      .join("\n")
);

fs.writeFileSync("content/speakers.json", JSON.stringify(updated, null, 2) + "\n");
console.log(`\nUpdated ${updated.length} speakers`);
