import fs from "fs";
import path from "path";

export function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
  } catch {
    return fallback;
  }
}

export function writeJsonFile(filePath: string, data: unknown, dryRun: boolean): void {
  if (dryRun) return;
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const tmpPath = `${filePath}.tmp`;
  fs.writeFileSync(tmpPath, `${JSON.stringify(data, null, 2)}\n`);
  fs.renameSync(tmpPath, filePath);
}

export function resolveContentPath(contentDir: string, ...segments: string[]): string {
  return path.join(contentDir, ...segments);
}
