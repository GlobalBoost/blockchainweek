import type { Theme } from "./types";

type SpeakerThemeInput = {
  title: string;
  company: string;
  bio?: string;
  headline?: string;
  badge?: string;
  tagline?: string;
  subtitle?: string;
  expertise?: string[];
  signatureMoves?: string[];
};

const THEME_RULES: { theme: Theme; patterns: RegExp[] }[] = [
  {
    theme: "bitcoin",
    patterns: [
      /\bbitcoin\b/i,
      /\bbtc\b/i,
      /\bblockchain fee/i,
      /\bblockchain economics/i,
      /\bmeme coin/i,
      /\blightning\b/i,
      /godfather of crypto/i,
      /bitcoin og/i,
      /bitcoin supercycle/i,
      /bitcoin foundation/i,
      /bitcoin treasury/i,
      /\bsatoshi\b/i,
      /bitangels/i,
    ],
  },
  {
    theme: "ai",
    patterns: [
      /\bai\b/i,
      /\bartificial intelligence\b/i,
      /\bgenai\b/i,
      /\bgen ai\b/i,
      /\bagent/i,
      /\breasoning agent/i,
      /\bmachine learning\b/i,
      /\bllm\b/i,
      /\bautonomous finance\b/i,
      /\bautonomous system/i,
      /\bdistributed intelligence\b/i,
      /\bai governance\b/i,
      /\bai validation\b/i,
      /\bai ethic/i,
      /\bai for resilience\b/i,
    ],
  },
  {
    theme: "space",
    patterns: [
      /\bspace finance\b/i,
      /\bspace\b/i,
      /\borbital\b/i,
      /\bsatellite\b/i,
      /\bnasa\b/i,
      /\binterplanetary\b/i,
    ],
  },
  {
    theme: "fashion",
    patterns: [
      /\bfashion\b/i,
      /\brunway\b/i,
      /\bnyfw\b/i,
      /\bcouture\b/i,
      /\bcultural architect/i,
      /\bluxury\b/i,
      /\brecording artist\b/i,
      /\bconnection economy\b/i,
    ],
  },
  {
    theme: "policy",
    patterns: [
      /\bpolicy\b/i,
      /\bdiplomat/i,
      /\bregulation\b/i,
      /\blegislation\b/i,
      /\bgovernment\b/i,
      /\bung\b/i,
      /\bpolitical economy/i,
      /\bpublic finance\b/i,
      /\beconomics professor\b/i,
      /\bdiplomacy\b/i,
      /\bstate digital asset policy\b/i,
      /\bngo goodwill\b/i,
      /\barbitrator\b/i,
      /\bdispute resolution\b/i,
    ],
  },
  {
    theme: "energy",
    patterns: [
      /\benergy\b/i,
      /\bcarbon\b/i,
      /\brenewable\b/i,
      /\bgreen blockchain/i,
      /\besg\b/i,
      /\bsustainable investing/i,
      /\bclean energy\b/i,
      /\bnutrient credit/i,
      /\benvironmental asset/i,
      /\boyster\b/i,
    ],
  },
  {
    theme: "investment",
    patterns: [
      /\binvestor\b/i,
      /\bventure capital\b/i,
      /\bvc\b/i,
      /\bmanaging partner\b/i,
      /\bprivate banking\b/i,
      /\bfintech executive\b/i,
      /\bfundraising\b/i,
      /\bwealth management\b/i,
      /\bangel network\b/i,
    ],
  },
  {
    theme: "identity",
    patterns: [
      /\bidentity\b/i,
      /\bdao\b/i,
      /\bverification economy\b/i,
      /\bself-?sovereign\b/i,
      /\bhuman ledger\b/i,
      /\btrust network/i,
      /\bhuman-?centered\b/i,
      /\bsocial capital\b/i,
      /\bfuture of work\b/i,
    ],
  },
];

const EXPLICIT_BITCOIN =
  /\bbitcoin\b|\bbtc\b|bitcoin og|bitcoin foundation|bitcoin supercycle|godfather of crypto/i;

const STABLECOIN_PRIMARY_FIELD =
  /\bstablecoin|\bstablecoins\b|\bqcad\b|\bcad stablecoin\b|\bdollar liquidity\b|\bdollar-backed\b|\bdollar-based settlement\b/i;

const STABLECOIN_EXPERTISE =
  /stablecoin infrastructure|stablecoin regulation|stablecoin settlement|stablecoin payments|stablecoins for|stablecoins in|cad stablecoin|stablecoin &/i;

function strongSignals(speaker: SpeakerThemeInput): string {
  return [
    speaker.title,
    speaker.company,
    speaker.headline,
    speaker.badge,
    speaker.tagline,
    speaker.subtitle,
    ...(speaker.expertise ?? []),
    ...(speaker.signatureMoves ?? []),
  ]
    .filter(Boolean)
    .join(" ");
}

function profileFields(speaker: SpeakerThemeInput): string {
  return [speaker.title, speaker.company, speaker.headline, speaker.badge, speaker.tagline, speaker.subtitle]
    .filter(Boolean)
    .join(" ");
}

function bioStablecoinSignal(bio: string): boolean {
  return (
    /\bstablecoin/i.test(bio) &&
    /\bescrow|settlement|payment|rails|liquidity|infrastructure|on\/off-?ramp|dollar access|custod/i.test(bio)
  );
}

function isStablecoinPrimary(speaker: SpeakerThemeInput): boolean {
  const profile = profileFields(speaker);

  if (STABLECOIN_PRIMARY_FIELD.test(profile)) {
    return true;
  }

  const stablecoinExpertise = (speaker.expertise ?? []).filter((item) => STABLECOIN_EXPERTISE.test(item));
  if (stablecoinExpertise.length > 0) {
    return true;
  }

  if (speaker.bio && bioStablecoinSignal(speaker.bio) && !EXPLICIT_BITCOIN.test(strongSignals(speaker))) {
    return true;
  }

  return false;
}

function matchThemes(signals: string): Theme[] {
  const themes: Theme[] = [];
  for (const { theme, patterns } of THEME_RULES) {
    if (patterns.some((pattern) => pattern.test(signals))) {
      themes.push(theme);
    }
  }
  return themes;
}

export function inferSpeakerThemes(speaker: SpeakerThemeInput): Theme[] {
  const signals = strongSignals(speaker);
  let themes = matchThemes(signals);

  if (isStablecoinPrimary(speaker)) {
    themes = ["stablecoin", ...themes.filter((theme) => theme !== "stablecoin")];
  } else {
    themes = themes.filter((theme) => theme !== "stablecoin");
  }

  const hasExplicitBitcoin = EXPLICIT_BITCOIN.test(signals);
  const stablecoinPrimary = isStablecoinPrimary(speaker);

  if (hasExplicitBitcoin && !stablecoinPrimary) {
    themes = themes.filter((theme) => theme !== "stablecoin");
  }

  if (stablecoinPrimary && !hasExplicitBitcoin) {
    themes = themes.filter((theme) => theme !== "bitcoin");
  }

  if (!themes.length) {
    themes = ["identity"];
  }

  return [...new Set(themes)].slice(0, 3);
}

export { THEME_RULES };
