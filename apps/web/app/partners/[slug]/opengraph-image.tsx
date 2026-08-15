import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { BRAND_NAME, BRAND_SEO_TITLE, EVENT_DATES, EVENT_LOCATION, LOGO_MAIN } from "@/lib/brand-constants";
import { getPartnerPageBySlug } from "@/lib/content";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

interface ImageProps {
  params: Promise<{ slug: string }>;
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

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const partner = getPartnerPageBySlug(slug);
  if (!partner) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0a0f",
            color: "white",
            fontFamily: "sans-serif",
            fontSize: 48,
            fontWeight: 800,
          }}
        >
          {BRAND_NAME}
        </div>
      ),
      { ...size }
    );
  }

  const partnerLogo = partner.logo ? await loadPublicAsset(partner.logo) : null;
  const brandLogo = await loadPublicAsset(LOGO_MAIN);
  const title = `${partner.name} × ${BRAND_NAME}`;

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
          background: "linear-gradient(135deg, #0d1b2a 0%, #0a1628 45%, #0a0a0f 100%)",
          color: "white",
          fontFamily: "sans-serif",
          padding: "56px 72px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 420,
              height: 132,
              borderRadius: 24,
              background: "#ffffff",
              padding: "24px 32px",
            }}
          >
            {partnerLogo ? (
              <img
                src={partnerLogo}
                alt=""
                width={356}
                height={84}
                style={{
                  display: "flex",
                  width: 356,
                  height: 84,
                  objectFit: "contain",
                }}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  fontSize: 42,
                  fontWeight: 800,
                  color: "#0d1b2a",
                }}
              >
                {partner.name}
              </div>
            )}
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 44,
              fontWeight: 600,
              color: "rgba(255,255,255,0.35)",
            }}
          >
            ×
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 420,
              height: 132,
              borderRadius: 24,
              background: "#ffffff",
              padding: "24px 32px",
            }}
          >
            {brandLogo ? (
              <img
                src={brandLogo}
                alt=""
                width={356}
                height={84}
                style={{
                  display: "flex",
                  width: 356,
                  height: 84,
                  objectFit: "contain",
                }}
              />
            ) : null}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 40,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            textAlign: "center",
            lineHeight: 1.15,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 24,
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
            marginTop: 16,
            fontSize: 20,
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
