import type { Listing } from "@/types/listing";
import type { CategoryDef } from "@/lib/categories";
import { buildAffiliateRedirectUrl } from "@/lib/affiliate-url";

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

type CuratedTube = {
  name: string;
  slug: string;
  siteKey: string;
  rating: number;
  description: string;
  tags: string[];
  website_url: string;
  badge?: string;
  popularity_score: number;
  added_date: string;
};

const TUBES: CuratedTube[] = [
  {
    name: "Pornhub",
    slug: "pornhub",
    siteKey: "pornhub",
    rating: 4.9,
    description:
      "Massive free library and daily uploads make it the default first stop for discovery-minded traffic.",
    tags: ["free", "videos", "trending"],
    website_url: "https://www.pornhub.com",
    badge: "Top",
    popularity_score: 98,
    added_date: "2025-11-02",
  },
  {
    name: "XVideos",
    slug: "xvideos",
    siteKey: "xvideos",
    rating: 4.85,
    description:
      "Huge long-tail catalog and fast loads—ideal for scale when you want cheap clicks at the top of the funnel.",
    tags: ["free", "videos", "long-tail"],
    website_url: "https://www.xvideos.com",
    badge: "Top",
    popularity_score: 97,
    added_date: "2025-11-05",
  },
  {
    name: "XNXX",
    slug: "xnxx",
    siteKey: "xnxx",
    rating: 4.82,
    description:
      "Sister-scale traffic to other major tubes—pair it with cam or premium upsells in your own funnel.",
    tags: ["free", "videos", "high-traffic"],
    website_url: "https://www.xnxx.com",
    badge: "Top",
    popularity_score: 96,
    added_date: "2025-11-06",
  },
  {
    name: "xHamster",
    slug: "xhamster",
    siteKey: "xhamster",
    rating: 4.7,
    description:
      "Community features and familiar UX keep session length strong for affiliate retargeting.",
    tags: ["free", "community", "videos"],
    website_url: "https://xhamster.com",
    popularity_score: 91,
    added_date: "2025-11-08",
  },
  {
    name: "Eporner",
    slug: "eporner",
    siteKey: "eporner",
    rating: 4.65,
    description:
      "Quality-tilted tube positioning helps pre-sell HD and premium upgrades without feeling spammy.",
    tags: ["free", "hd", "videos"],
    website_url: "https://www.eporner.com",
    popularity_score: 88,
    added_date: "2025-11-10",
  },
  {
    name: "HQPorner",
    slug: "hqporner",
    siteKey: "hqporner",
    rating: 4.55,
    description:
      "Bitrate-forward branding attracts viewers who are already primed for paid studio content.",
    tags: ["free", "hd", "streaming"],
    website_url: "https://hqporner.com",
    popularity_score: 84,
    added_date: "2025-11-12",
  },
  {
    name: "SpankBang",
    slug: "spankbang",
    siteKey: "spankbang",
    rating: 4.5,
    description:
      "Lean player and aggressive discovery—great for arbitrage when you route clicks to higher-EPC offers.",
    tags: ["free", "trending", "fast"],
    website_url: "https://spankbang.com",
    popularity_score: 86,
    added_date: "2025-11-14",
  },
  {
    name: "YouPorn",
    slug: "youporn",
    siteKey: "youporn",
    rating: 4.45,
    description:
      "Household-name recognition lowers bounce on cold traffic from search and social previews.",
    tags: ["free", "videos", "brand"],
    website_url: "https://www.youporn.com",
    popularity_score: 82,
    added_date: "2025-11-16",
  },
  {
    name: "RedTube",
    slug: "redtube",
    siteKey: "redtube",
    rating: 4.4,
    description:
      "Classic tube UX with broad niches—use it as a trust anchor before pushing trials or cams.",
    tags: ["free", "videos", "classic"],
    website_url: "https://www.redtube.com",
    popularity_score: 80,
    added_date: "2025-11-18",
  },
  {
    name: "Tube8",
    slug: "tube8",
    siteKey: "tube8",
    rating: 4.35,
    description:
      "Straightforward search and categories make it easy to match intent with your downstream monetization.",
    tags: ["free", "videos", "search"],
    website_url: "https://www.tube8.com",
    popularity_score: 78,
    added_date: "2025-11-20",
  },
];

function reviewFor(name: string): string {
  return `${name} is positioned as top-of-funnel free traffic: huge catalogs, ad-supported playback, and predictable search behavior. We list it for readers comparing tubes before upgrading to premium or cam products; always verify age-gate flows, regional restrictions, and your affiliate program terms before scaling spend.`;
}

export function buildCuratedFreeTubeListings(cat: CategoryDef): Listing[] {
  return TUBES.map((t, i) => {
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
      affiliate_url: buildAffiliateRedirectUrl(t.siteKey),
      website_url: t.website_url,
      rating: t.rating,
      added_date: t.added_date,
      popularity_score: t.popularity_score,
      ...(t.badge ? { badge: t.badge } : {}),
    };
  });
}
