import type { PartnerPage } from "@/lib/types";

export type PartnerLogoFit = "banner" | "wide" | "compact" | "square";

const LOGO_FIT_STYLES: Record<PartnerLogoFit, { box: string; image: string }> = {
  banner: {
    box: "px-5 py-2 sm:px-6 sm:py-2.5",
    image: "scale-110 sm:scale-115",
  },
  wide: {
    box: "px-4 py-2 sm:px-5 sm:py-3",
    image: "scale-100",
  },
  compact: {
    box: "px-3 py-2 sm:px-4 sm:py-2.5",
    image: "scale-105 sm:scale-110",
  },
  square: {
    box: "px-3 py-2 sm:px-4 sm:py-3",
    image: "scale-100",
  },
};

export function getPartnerLogoStyles(partner: PartnerPage) {
  const fit = partner.logoFit ?? "wide";

  return {
    boxClassName: partner.logoBoxClassName ?? LOGO_FIT_STYLES[fit].box,
    imageClassName: partner.logoClassName ?? LOGO_FIT_STYLES[fit].image,
  };
}
