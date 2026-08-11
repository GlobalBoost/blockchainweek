import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getSpeakerBySlug } from "@/lib/content";
import { BRAND_SEO_TITLE } from "@/lib/brand-constants";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "Speaker at Blockchain Week - UNGA Edition 2026";

interface ImageProps {
  params: Promise<{ slug: string }>;
}

function truncate(text: string, max: number) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, Math.max(0, max - 1)).trimEnd()}…`;
}

function mimeFromPath(path: string) {
  const ext = path.split(".").pop()?.toLowerCase();
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "webp") return "image/webp";
  if (ext === "gif") return "image/gif";
  return "image/png";
}

async function loadPublicAsset(publicPath: string | undefined) {
  if (!publicPath) return null;
  try {
    const relative = publicPath.replace(/^\//, "");
    const filePath = join(process.cwd(), "public", relative);
    const buffer = await readFile(filePath);
    return `data:${mimeFromPath(relative)};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

function subtitleFor(speaker: {
  subtitle?: string;
  company?: string;
  tagline?: string;
}) {
  const raw = speaker.subtitle || speaker.company || speaker.tagline;
  if (!raw) return null;
  return truncate(raw.replace(/\n+/g, " · "), 120);
}

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const speaker = getSpeakerBySlug(slug);

  if (!speaker) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0a0f",
            color: "white",
            fontFamily: "sans-serif",
          }}
        >
          <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: "-0.02em" }}>
            Blockchain Week - UNGA Edition 2026
          </div>
          <div style={{ marginTop: 16, fontSize: 28, color: "rgba(255,255,255,0.65)" }}>
            Times Square, NYC
          </div>
        </div>
      ),
      { ...size }
    );
  }

  const speakerPhoto = await loadPublicAsset(speaker.photo);
  const photoSrc = speakerPhoto ?? (await loadPublicAsset("/logo.png"));
  const usingPhotoFallback = !speakerPhoto;
  const subtitle = subtitleFor(speaker);
  const title = truncate(speaker.title, 90);
  const name = truncate(speaker.name, 48);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0d1b2a 0%, #0a1628 45%, #0a0a0f 100%)",
          color: "white",
          fontFamily: "sans-serif",
          padding: "56px 64px 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            gap: 56,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 360,
              height: 360,
              flexShrink: 0,
              borderRadius: 36,
              border: "4px solid rgba(0, 158, 219, 0.45)",
              overflow: "hidden",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            {photoSrc ? (
              <img
                src={photoSrc}
                alt=""
                width={360}
                height={360}
                style={{
                  width: 360,
                  height: 360,
                  objectFit: usingPhotoFallback ? "contain" : "cover",
                  objectPosition: "center",
                  padding: usingPhotoFallback ? 48 : 0,
                }}
              />
            ) : null}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              minWidth: 0,
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: name.length > 28 ? 52 : 64,
                fontWeight: 800,
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
                lineHeight: 1.05,
                color: "#ffffff",
              }}
            >
              {name}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: title.length > 60 ? 28 : 34,
                fontWeight: 600,
                lineHeight: 1.3,
                color: "#009edb",
              }}
            >
              {title}
            </div>
            {subtitle ? (
              <div
                style={{
                  display: "flex",
                  marginTop: 18,
                  fontSize: 26,
                  lineHeight: 1.35,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {subtitle}
              </div>
            ) : null}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 22,
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.55)",
          }}
        >
          {BRAND_SEO_TITLE}
        </div>
      </div>
    ),
    { ...size }
  );
}
