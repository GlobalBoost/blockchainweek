import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import {
  EVENT_DATES,
  EVENT_LOCATION,
  LOGO_WHITE,
} from "@/lib/brand-constants";

export const alt =
  "Confirmed Programming for Blockchain Week - UNGA Edition 2026 at Gallery MC, New York City";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

function mimeFromBuffer(buffer: Buffer, pathHint: string) {
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return "image/png";
  }
  if (buffer.length >= 4 && buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46) {
    return "image/webp";
  }

  const ext = pathHint.split(".").pop()?.toLowerCase();
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
    return `data:${mimeFromBuffer(buffer, relative)};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function Image() {
  const [skyline, logo] = await Promise.all([
    loadPublicAsset("/hero/nyc-skyline.png"),
    loadPublicAsset(LOGO_WHITE),
  ]);

  // Cover-fit the 1024×682 skyline into 1200×630 without stretching.
  const skylineWidth = 1200;
  const skylineHeight = Math.round((682 / 1024) * skylineWidth);
  const skylineTop = Math.round((size.height - skylineHeight) / 2);

  return new ImageResponse(
    (
      <div
        style={{
          width: size.width,
          height: size.height,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          fontFamily: "sans-serif",
          color: "#ffffff",
          background: "linear-gradient(135deg, #0d1b2a 0%, #0a1628 45%, #0a0a0f 100%)",
        }}
      >
        {skyline ? (
          <img
            src={skyline}
            alt=""
            width={skylineWidth}
            height={skylineHeight}
            style={{
              position: "absolute",
              left: 0,
              top: skylineTop,
              width: skylineWidth,
              height: skylineHeight,
            }}
          />
        ) : null}

        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size.width,
            height: size.height,
            display: "flex",
            background:
              "linear-gradient(180deg, rgba(10,10,15,0.72) 0%, rgba(10,16,40,0.55) 42%, rgba(10,10,15,0.88) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: size.width,
            height: size.height,
            padding: "40px 64px 44px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {logo ? (
              <img
                src={logo}
                alt=""
                width={200}
                height={121}
                style={{
                  width: 200,
                  height: 121,
                  objectFit: "contain",
                  objectPosition: "left center",
                }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  fontSize: 28,
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "#009edb",
                }}
              >
                Blockchain Week
              </div>
            )}
            <div
              style={{
                display: "flex",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#c9a227",
              }}
            >
              Run of show
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
              maxWidth: 980,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 64,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                textTransform: "uppercase",
              }}
            >
              Confirmed Programming
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 500,
                lineHeight: 1.35,
                color: "rgba(255,255,255,0.82)",
                maxWidth: 900,
              }}
            >
              Timed run of show for CryptoMondays, Liberland Meetup, the Gallery MC main stage,
              BitcoinPalooza, and the Washington Elite Investment Summit & Gala.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#009edb",
              }}
            >
              {`${EVENT_DATES} · ${EVENT_LOCATION}`}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              UNGA + NYFW 2026
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
