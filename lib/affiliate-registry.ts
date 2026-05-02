export type AffiliateTier = "tier1" | "tier2" | "tier3";

export type AffiliateStatus =
  | "not_checked"
  | "researching"
  | "applied"
  | "approved"
  | "rejected";

export type AffiliateEntry = {
  slug: string;
  name: string;
  baseUrl: string;
  affiliateUrl?: string;
  hasAffiliate: boolean;
  /** Workflow tracking (registry defaults; admin UI may override via localStorage). */
  status: AffiliateStatus;
  affiliateNetwork?: string;
  tier: AffiliateTier;
  category: string[];
};

function envUrl(key: string): string | undefined {
  if (typeof process === "undefined") return undefined;
  const v = process.env[key]?.trim();
  return v || undefined;
}

/**
 * Central catalog of partner destinations. Curated listing `slug` values must match
 * `slug` here for `getAffiliateLink` to resolve tracked URLs.
 */
export const AFFILIATE_REGISTRY: AffiliateEntry[] = [
  {
    slug: "stripchat",
    name: "Stripchat",
    baseUrl: "https://stripchat.com",
    affiliateUrl: envUrl("NEXT_PUBLIC_STRIPCHAT_AFFILIATE_URL"),
    hasAffiliate: true,
    status: "not_checked",
    affiliateNetwork: "Stripchat / MA",
    tier: "tier1",
    category: ["live-cams"],
  },
  {
    slug: "jerkmate",
    name: "JerkMate",
    baseUrl: "https://jerkmate.com",
    hasAffiliate: false,
    status: "not_checked",
    tier: "tier1",
    category: ["live-cams", "sex-chat"],
  },
  {
    slug: "bongacams",
    name: "BongaCams",
    baseUrl: "https://bongacams.com",
    hasAffiliate: false,
    status: "not_checked",
    tier: "tier1",
    category: ["live-cams"],
  },
  {
    slug: "fansly",
    name: "Fansly",
    baseUrl: "https://fansly.com",
    hasAffiliate: false,
    status: "not_checked",
    tier: "tier1",
    category: ["fan-subscription-platforms", "amateur"],
  },
  {
    slug: "onlyfans",
    name: "OnlyFans",
    baseUrl: "https://onlyfans.com",
    hasAffiliate: false,
    status: "not_checked",
    tier: "tier1",
    category: ["fan-subscription-platforms"],
  },
  {
    slug: "manyvids",
    name: "ManyVids",
    baseUrl: "https://www.manyvids.com",
    hasAffiliate: false,
    status: "not_checked",
    tier: "tier1",
    category: ["amateur", "fan-subscription-platforms"],
  },
  {
    slug: "manyvids-fetish",
    name: "ManyVids",
    baseUrl: "https://www.manyvids.com",
    hasAffiliate: false,
    status: "not_checked",
    tier: "tier1",
    category: ["fetish-bdsm"],
  },
  {
    slug: "iwantclips",
    name: "iWantClips",
    baseUrl: "https://www.iwantclips.com",
    hasAffiliate: false,
    status: "not_checked",
    tier: "tier2",
    category: ["amateur"],
  },
  {
    slug: "iwantclips-fetish",
    name: "iWantClips",
    baseUrl: "https://www.iwantclips.com",
    hasAffiliate: false,
    status: "not_checked",
    tier: "tier2",
    category: ["fetish-bdsm"],
  },
  {
    slug: "clips4sale",
    name: "Clips4Sale",
    baseUrl: "https://www.clips4sale.com",
    hasAffiliate: false,
    status: "not_checked",
    tier: "tier2",
    category: ["amateur"],
  },
  {
    slug: "clips4sale-fetish",
    name: "Clips4Sale",
    baseUrl: "https://www.clips4sale.com",
    hasAffiliate: false,
    status: "not_checked",
    tier: "tier2",
    category: ["fetish-bdsm"],
  },
  {
    slug: "fetish-network",
    name: "Fetish Network",
    baseUrl: "https://www.fetishnetwork.com",
    hasAffiliate: false,
    status: "not_checked",
    tier: "tier2",
    category: ["fetish-bdsm"],
  },
  {
    slug: "kink",
    name: "Kink",
    baseUrl: "https://www.kink.com",
    hasAffiliate: false,
    status: "not_checked",
    tier: "tier2",
    category: ["fetish-bdsm"],
  },
  {
    slug: "heavy-r",
    name: "Heavy-R",
    baseUrl: "https://heavy-r.com",
    hasAffiliate: false,
    status: "not_checked",
    tier: "tier3",
    category: ["fetish-bdsm"],
  },
  {
    slug: "thisvid",
    name: "ThisVid",
    baseUrl: "https://thisvid.com",
    hasAffiliate: false,
    status: "not_checked",
    tier: "tier3",
    category: ["fetish-bdsm"],
  },
  {
    slug: "motherless",
    name: "Motherless",
    baseUrl: "https://motherless.com",
    hasAffiliate: false,
    status: "not_checked",
    tier: "tier3",
    category: ["fetish-bdsm"],
  },
  {
    slug: "pervertium",
    name: "Pervertium",
    baseUrl: "https://pervertium.com",
    hasAffiliate: false,
    status: "not_checked",
    tier: "tier3",
    category: ["fetish-bdsm"],
  },
  {
    slug: "hypnotube",
    name: "HypnoTube",
    baseUrl: "https://hypnotube.com",
    hasAffiliate: false,
    status: "not_checked",
    tier: "tier3",
    category: ["fetish-bdsm"],
  },
  {
    slug: "boundhub",
    name: "BoundHub",
    baseUrl: "https://boundhub.com",
    hasAffiliate: false,
    status: "not_checked",
    tier: "tier3",
    category: ["fetish-bdsm"],
  },
];

const bySlug = new Map(AFFILIATE_REGISTRY.map((e) => [e.slug, e]));

export function getAffiliateRegistryEntry(slug: string): AffiliateEntry | undefined {
  return bySlug.get(slug);
}

function logAffiliateRegistryIssuesDev(): void {
  if (process.env.NODE_ENV !== "development") return;
  const missingTracked = AFFILIATE_REGISTRY.filter(
    (e) => e.hasAffiliate && !(e.affiliateUrl?.trim()),
  );
  if (missingTracked.length > 0) {
    // eslint-disable-next-line no-console -- intentional dev diagnostics
    console.info(
      "[affiliate-registry] hasAffiliate=true but no affiliateUrl (set NEXT_PUBLIC_STRIPCHAT_AFFILIATE_URL or affiliateUrl on the entry):",
      missingTracked.map((e) => e.slug),
    );
  }
  const approvedNoUrl = AFFILIATE_REGISTRY.filter(
    (e) => e.status === "approved" && !(e.affiliateUrl?.trim()),
  );
  if (approvedNoUrl.length > 0) {
    // eslint-disable-next-line no-console -- intentional dev diagnostics
    console.warn(
      "[affiliate-registry] status is approved but affiliateUrl is empty:",
      approvedNoUrl.map((e) => e.slug),
    );
  }
}

logAffiliateRegistryIssuesDev();
