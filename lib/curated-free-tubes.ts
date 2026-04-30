import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";

const PHOTOS = [
  "photo-1611162617474-5b21e879e113",
  "photo-1522071820081-009f0129c71c",
  "photo-1556761175-5973dc0f32e7",
  "photo-1516321318423-f06f85e504b3",
  "photo-1600880292203-757bb62b4baf",
  "photo-1556761175-b413da4baf72",
  "photo-1553877522-43269d4ea984",
  "photo-1542744173-8e7e53415bb0",
  "photo-1557804506-669a67965ba0",
  "photo-1492684223066-81342ee5ff30",
];

function imageFor(seed: number) {
  const id = PHOTOS[Math.abs(seed) % PHOTOS.length]!;
  return `https://images.unsplash.com/${id}?w=900&q=82&fit=crop`;
}

function logoFor(seed: number) {
  const id = PHOTOS[(Math.abs(seed) * 7) % PHOTOS.length]!;
  return `https://images.unsplash.com/${id}?w=160&q=80&fit=crop`;
}

function seedFor(key: string) {
  let h = 0;
  for (let i = 0; i < key.length; i++) {
    h = (h * 31 + key.charCodeAt(i)) >>> 0;
  }
  return h;
}

export type CuratedTube = {
  name: string;
  slug: string;
  siteKey: string;
  rating: number;
  tag: string;
  description: string;
  tags: string[];
  website_url: string;
  badge?: string;
  popularity_score: number;
  added_date: string;
  tier: 1 | 2 | 3;
};

/** Static rows — `rating` / `popularity_score` are derived in `buildCuratedFreeTubeListings` from `tier` + sort index. */
type CuratedTubeRow = Omit<CuratedTube, "rating" | "popularity_score">;

const TUBES: CuratedTubeRow[] = [
  {
    name: "Pornhub",
    slug: "pornhub",
    siteKey: "pornhub",
    tier: 1,
    tag: "Community",
    description:
      "Watch instantly — no signup, huge variety, and endless scrolling.",
    tags: ["free", "videos", "trending"],
    website_url: "https://www.pornhub.com",
    badge: "Top Pick",
    added_date: "2025-11-02",
  },
  {
    name: "XVideos",
    slug: "xvideos",
    siteKey: "xvideos",
    tier: 1,
    tag: "Community",
    description:
      "Find exactly what you want fast — massive library with quick loading.",
    tags: ["free", "videos", "long-tail"],
    website_url: "https://www.xvideos.com",
    badge: "Huge Library",
    added_date: "2025-11-05",
  },
  {
    name: "XNXX",
    slug: "xnxx",
    siteKey: "xnxx",
    tier: 1,
    tag: "Community",
    description:
      "Simple, fast, and reliable — jump straight into videos without friction.",
    tags: ["free", "videos", "high-traffic"],
    website_url: "https://www.xnxx.com",
    badge: "Fast Browse",
    added_date: "2025-11-06",
  },
  {
    name: "xHamster",
    slug: "xhamster",
    siteKey: "xhamster",
    tier: 1,
    tag: "Community",
    description:
      "Community features and familiar UX keep session length strong for affiliate retargeting.",
    tags: ["free", "community", "videos"],
    website_url: "https://xhamster.com",
    added_date: "2025-11-08",
  },
  {
    name: "SpankBang",
    slug: "spankbang",
    siteKey: "spankbang",
    tier: 2,
    tag: "Community",
    description:
      "Lean player and aggressive discovery—great for arbitrage when you route clicks to higher-EPC offers.",
    tags: ["free", "trending", "fast"],
    website_url: "https://spankbang.com",
    added_date: "2025-11-14",
  },
  {
    name: "Eporner",
    slug: "eporner",
    siteKey: "eporner",
    tier: 2,
    tag: "Clips",
    description:
      "Quality-tilted tube positioning helps pre-sell HD and premium upgrades without feeling spammy.",
    tags: ["free", "hd", "videos"],
    website_url: "https://www.eporner.com",
    added_date: "2025-11-10",
  },
  {
    name: "YouPorn",
    slug: "youporn",
    siteKey: "youporn",
    tier: 2,
    tag: "Community",
    description:
      "Household-name recognition lowers bounce on cold traffic from search and social previews.",
    tags: ["free", "videos", "brand"],
    website_url: "https://www.youporn.com",
    added_date: "2025-11-16",
  },
  {
    name: "RedTube",
    slug: "redtube",
    siteKey: "redtube",
    tier: 2,
    tag: "Community",
    description:
      "Classic tube UX with broad niches—use it as a trust anchor before pushing trials or cams.",
    tags: ["free", "videos", "classic"],
    website_url: "https://www.redtube.com",
    added_date: "2025-11-18",
  },
  {
    name: "HQPorner",
    slug: "hqporner",
    siteKey: "hqporner",
    tier: 3,
    tag: "Studio",
    description:
      "Bitrate-forward branding attracts viewers who are already primed for paid studio content.",
    tags: ["free", "hd", "streaming"],
    website_url: "https://hqporner.com",
    added_date: "2025-11-12",
  },
  {
    name: "Tube8",
    slug: "tube8",
    siteKey: "tube8",
    tier: 3,
    tag: "Community",
    description:
      "Straightforward search and categories make it easy to match intent with your downstream monetization.",
    tags: ["free", "videos", "search"],
    website_url: "https://www.tube8.com",
    added_date: "2025-11-20",
  },
];

function rowScore(tier: 1 | 2 | 3, index: number): { rating: number; popularity_score: number } {
  const tierBase = {
    1: 4.9,
    2: 4.7,
    3: 4.4,
  }[tier];
  const rating = Math.round((tierBase - index * 0.02) * 10) / 10;
  const popularity_score = (tier === 1 ? 100 : tier === 2 ? 92 : 84) - index;
  return { rating, popularity_score };
}

function reviewFor(name: string): string {
  return `${name} is positioned as top-of-funnel free traffic: huge catalogs, ad-supported playback, and predictable search behavior. We list it for readers comparing tubes before upgrading to premium or cam products; always verify age-gate flows, regional restrictions, and your affiliate program terms before scaling spend.`;
}

export function buildCuratedFreeTubeListings(cat: CategoryDef): Listing[] {
  const sorted = [...TUBES].sort((a, b) => a.tier - b.tier);
  return sorted.map((t, i) => {
    const { rating, popularity_score } = rowScore(t.tier, i);
    const s = seedFor(t.slug);
    return {
      id: `listing-tube-${t.slug}`,
      name: t.name,
      slug: t.slug,
      categorySlug: cat.slug,
      categoryLabel: cat.label,
      tags: t.tags,
      description: t.description,
      review: reviewFor(t.name),
      pros: [
        "Very high baseline traffic and search demand",
        "Easy on-ramp for new affiliate accounts in the tube vertical",
        "Strong fit for upselling premium, cams, or AI chat downstream",
      ],
      cons: [
        "Ad-heavy free tiers can dilute perceived quality vs paid sites",
        "Payouts and caps vary by geo and traffic source",
        "Compliance and brand-safety rules require careful placement",
      ],
      image: imageFor(s + i),
      logo: logoFor(s + i + 3),
      affiliate_url: buildListingOutboundPath(t.slug),
      website_url: t.website_url,
      rating,
      tag: t.tag,
      added_date: t.added_date,
      popularity_score,
      ...(t.badge ? { badge: t.badge } : {}),
    };
  });
}
