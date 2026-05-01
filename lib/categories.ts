export type CategoryDef = {
  slug: string;
  label: string;
  description: string;
  /** Stable cover art for chrome (mega menu, hubs). Path under `public`. */
  coverImage: string;
  /** Sort key for mega menu (ascending). */
  megaMenuOrder: number;
  /** Optional `r,g,b` for subtle hover emphasis on mega menu tiles. */
  megaMenuAccentRgb?: string;
  /** Shorter line for mega menu tiles; full `label` stays for SEO and a11y. */
  megaMenuShortLabel?: string;
};

/** Curated verticals only — each has a real listing set in `generate-listings`. */
export const CATEGORIES: CategoryDef[] = [
  {
    slug: "free-tube",
    label: "Free Porn Tube Sites",
    description:
      "High-traffic free tubes with huge libraries — top-of-funnel traffic you can route toward premium, cams, or AI offers.",
    coverImage: "/images/sites/free/spankbang.png",
    megaMenuOrder: 10,
    megaMenuAccentRgb: "244,63,94",
    megaMenuShortLabel: "Free tubes",
  },
  {
    slug: "search",
    label: "Porn Search Engines",
    description:
      "Tube search, meta indexes, and discovery hubs — route intent across your funnel and complementary offers.",
    coverImage: "/images/sites/searchEngine/xvideos.png",
    megaMenuOrder: 70,
    megaMenuShortLabel: "Search",
  },
  {
    slug: "premium-porn",
    label: "Premium Porn Sites",
    description:
      "Subscription studios with licensed scenes, downloads where available, and fewer ads.",
    coverImage: "/images/sites/premium/blacked.png",
    megaMenuOrder: 30,
    megaMenuAccentRgb: "124,92,255",
    megaMenuShortLabel: "Premium",
  },
  {
    slug: "escort-directories",
    label: "Escort Directories",
    description:
      "Curated directories for browsing escort listings across regions and niches, including male, female, and specialty services.",
    coverImage: "/images/sites/escorts/massage-republic.png",
    megaMenuOrder: 140,
    megaMenuShortLabel: "Escorts",
  },
  {
    slug: "male-companions",
    label: "Male Companions",
    description:
      "Platforms focused on male escorts and companions, including directories and listing services tailored for male providers.",
    coverImage: "/images/sites/male-companion/tryst.png",
    megaMenuOrder: 150,
    megaMenuAccentRgb: "96,165,250",
  },
  {
    slug: "vr",
    label: "VR (Virtual Reality) Porn",
    description:
      "Immersive 180°/360° libraries with headset-ready players and scene previews.",
    coverImage: "/images/sites/virtual/vrporn.png",
    megaMenuOrder: 60,
    megaMenuAccentRgb: "56,189,248",
    megaMenuShortLabel: "VR porn",
  },
  {
    slug: "live-cams",
    label: "Live Sex Cams",
    description:
      "Token-based rooms, tipping rails, and discovery feeds for real-time interaction.",
    coverImage: "/images/sites/livecam/stripchat.png",
    megaMenuOrder: 20,
    megaMenuAccentRgb: "0,188,212",
    megaMenuShortLabel: "Live cams",
  },
  {
    slug: "fan-subscription-platforms",
    label: "Fan Subscription Platforms",
    description:
      "Creator-driven platforms where users subscribe to exclusive content from independent adult creators.",
    coverImage: "/images/sites/creator/fansly.png",
    megaMenuOrder: 50,
    megaMenuAccentRgb: "236,72,153",
    megaMenuShortLabel: "Fan platforms",
  },
  {
    slug: "amateur",
    label: "Amateur Porn Sites",
    description:
      "Creator platforms, clip stores, and fan subscriptions — homemade and independent intent, separate from premium studio catalogs and free tubes.",
    coverImage: "/images/sites/amateur/justforfansAmateur.png",
    megaMenuOrder: 40,
    megaMenuAccentRgb: "255,122,0",
    megaMenuShortLabel: "Amateur",
  },
  {
    slug: "ai-generated",
    label: "AI Generated Porn",
    description:
      "Create your own AI generated porn images of animated and realistic imaginary women — companions, chat, and generators with strong recurring commissions.",
    coverImage: "/images/sites/ai/candyai.png",
    megaMenuOrder: 120,
    megaMenuAccentRgb: "34,211,238",
    megaMenuShortLabel: "AI porn",
  },
  {
    slug: "hookup",
    label: "Hookup & Dating Sites",
    description:
      "High-payout adult dating and casual meetup programs — CPA-focused offers with strong conversion when traffic is compliant and disclosed.",
    coverImage: "/images/sites/hookup/adultfriendfinder.png",
    megaMenuOrder: 90,
    megaMenuShortLabel: "Hookup",
  },
  {
    slug: "sex-chat",
    label: "Sex Chat / Sexting",
    description:
      "Sex chat and sexting platforms—pay-per-message apps, private messaging, and real-time adult chat built for engagement, fast replies, and compliant outbound funnels.",
    coverImage: "/images/sites/sexchat/jerkmate.png",
    megaMenuOrder: 100,
    megaMenuAccentRgb: "52,211,153",
    megaMenuShortLabel: "Sex chat",
  },
  {
    slug: "hentai-anime",
    label: "Best Hentai & Anime Porn Sites",
    description:
      "Manga readers, streaming hubs, and archives — high-traffic niche with mixed affiliate quality; keep disclosures and regional rules in mind.",
    coverImage: "/images/sites/adultgames/hentaiheroes.png",
    megaMenuOrder: 110,
    megaMenuAccentRgb: "192,132,252",
    megaMenuShortLabel: "Hentai & anime",
  },
  {
    slug: "fetish-bdsm",
    label: "Fetish & BDSM",
    description:
      "Networks, clip stores, dating, and niche tubes — balanced for monetization, depth, and long-tail SEO; keep everything consent-forward and policy-clean.",
    coverImage: "/images/sites/fetish/kink.png",
    megaMenuOrder: 80,
    megaMenuAccentRgb: "248,113,113",
    megaMenuShortLabel: "Fetish",
  },
  {
    slug: "gaming",
    label: "Adult / Sex Games",
    description:
      "Real adult game hubs — Nutaku-style publishers, indie marketplaces, communities, and browser or downloadable titles. Strong for SEO and engagement; not your primary CPA vertical.",
    coverImage: "/images/sites/adultgames/nutaku.png",
    megaMenuOrder: 130,
    megaMenuAccentRgb: "251,146,60",
    megaMenuShortLabel: "Adult games",
  },
];

export function getCategoryBySlug(slug: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export const categorySlugs = CATEGORIES.map((c) => ({
  slug: c.slug,
  label: c.label,
}));
