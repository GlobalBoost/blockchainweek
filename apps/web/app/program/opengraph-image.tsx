import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { EVENT_DATES, EVENT_LOCATION } from "@/lib/brand-constants";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const GRADIENT_BLUE_PURPLE = "linear-gradient(90deg, #009edb 0%, #a855f7 100%)";
const GRADIENT_PINK_PURPLE = "linear-gradient(90deg, #e879f9 0%, #a855f7 100%)";

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

function GradientText({ children, gradient }: { children: string; gradient: string }) {
  return (
    <span
      style={{
        background: gradient,
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {children}
    </span>
  );
}

export default async function Image() {
  const skyline = await loadPublicAsset("/hero/nyc-skyline.png");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          color: "white",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {skyline ? (
          <img
            src={skyline}
            alt=""
            width={1200}
            height={630}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #0d1b2a 0%, #0a1628 45%, #0a0a0f 100%)",
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,10,15,0.55) 0%, rgba(10,10,15,0.35) 45%, rgba(10,10,15,0.75) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              textAlign: "center",
              lineHeight: 1.05,
              color: "#ffffff",
            }}
          >
            Blockchain Week 2026
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              textAlign: "center",
              lineHeight: 1.05,
            }}
          >
            <span style={{ color: "#ffffff" }}>Official. </span>
            <GradientText gradient={GRADIENT_BLUE_PURPLE}>Events.</GradientText>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 8,
              fontSize: 64,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              textAlign: "center",
              lineHeight: 1.05,
            }}
          >
            <GradientText gradient={GRADIENT_PINK_PURPLE}>Schedule.</GradientText>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            width: "100%",
            justifyContent: "center",
            padding: "0 48px 40px",
            fontSize: 20,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#009edb",
            textAlign: "center",
          }}
        >
          {`UNGA + NYFW 2026 • ${EVENT_DATES.toUpperCase()} • ${EVENT_LOCATION.toUpperCase()}`}
        </div>
      </div>
    ),
    { ...size }
  );
}
