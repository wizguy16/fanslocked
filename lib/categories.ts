export type CategoryDef = {
  slug: string;
  label: string;
  description: string;
};

/** Curated verticals only — each has a real listing set in `generate-listings`. */
export const CATEGORIES: CategoryDef[] = [
  {
    slug: "free-tube",
    label: "Free Porn Tube Sites",
    description:
      "High-traffic free tubes with huge libraries — top-of-funnel traffic you can route toward premium, cams, or AI offers.",
  },
  {
    slug: "search",
    label: "Porn Search Engines",
    description:
      "Tube search, meta indexes, and discovery hubs — route intent across your funnel and complementary offers.",
  },
  {
    slug: "premium-porn",
    label: "Premium Porn Sites",
    description:
      "Subscription studios with licensed scenes, downloads where available, and fewer ads.",
  },
  {
    slug: "escort-directories",
    label: "Escort Directories",
    description:
      "Curated directories for browsing escort listings across regions and niches, including male, female, and specialty services.",
  },
  {
    slug: "male-companions",
    label: "Male Companions",
    description:
      "Platforms focused on male escorts and companions, including directories and listing services tailored for male providers.",
  },
  {
    slug: "vr",
    label: "VR (Virtual Reality) Porn",
    description:
      "Immersive 180°/360° libraries with headset-ready players and scene previews.",
  },
  {
    slug: "live-cams",
    label: "Live Sex Cams",
    description:
      "Token-based rooms, tipping rails, and discovery feeds for real-time interaction.",
  },
  {
    slug: "fan-subscription-platforms",
    label: "Fan Subscription Platforms",
    description:
      "Creator-driven platforms where users subscribe to exclusive content from independent adult creators.",
  },
  {
    slug: "amateur",
    label: "Amateur Porn Sites",
    description:
      "Creator platforms, clip stores, and fan subscriptions — homemade and independent intent, separate from premium studio catalogs and free tubes.",
  },
  {
    slug: "ai-generated",
    label: "AI Generated Porn",
    description:
      "Create your own AI generated porn images of animated and realistic imaginary women — companions, chat, and generators with strong recurring commissions.",
  },
  {
    slug: "hookup",
    label: "Hookup & Dating Sites",
    description:
      "High-payout adult dating and casual meetup programs — CPA-focused offers with strong conversion when traffic is compliant and disclosed.",
  },
  {
    slug: "sex-chat",
    label: "Sex Chat / Sexting",
    description:
      "Sex chat and sexting platforms—pay-per-message apps, private messaging, and real-time adult chat built for engagement, fast replies, and compliant outbound funnels.",
  },
  {
    slug: "hentai-anime",
    label: "Best Hentai & Anime Porn Sites",
    description:
      "Manga readers, streaming hubs, and archives — high-traffic niche with mixed affiliate quality; keep disclosures and regional rules in mind.",
  },
  {
    slug: "fetish-bdsm",
    label: "Fetish & BDSM",
    description:
      "Networks, clip stores, dating, and niche tubes — balanced for monetization, depth, and long-tail SEO; keep everything consent-forward and policy-clean.",
  },
  {
    slug: "gaming",
    label: "Adult / Sex Games",
    description:
      "Real adult game hubs — Nutaku-style publishers, indie marketplaces, communities, and browser or downloadable titles. Strong for SEO and engagement; not your primary CPA vertical.",
  },
];

export function getCategoryBySlug(slug: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export const categorySlugs = CATEGORIES.map((c) => ({
  slug: c.slug,
  label: c.label,
}));
