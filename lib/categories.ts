export type CategoryDef = {
  slug: string;
  label: string;
  description: string;
};

/** Curated verticals — minimum 30 for directory coverage. */
export const CATEGORIES: CategoryDef[] = [
  {
    slug: "best-overall",
    label: "Best Overall Porn Sites",
    description:
      "Editor-tested picks that balance catalog depth, streaming quality, and trustworthy billing.",
  },
  {
    slug: "premium-porn",
    label: "Premium Porn Sites",
    description:
      "Subscription studios with licensed scenes, downloads where available, and fewer ads.",
  },
  {
    slug: "free-tubes",
    label: "Free Porn Tubes",
    description:
      "High-traffic tubes with massive libraries — great for sampling before you upgrade.",
  },
  {
    slug: "hd-4k",
    label: "HD / 4K Porn Sites",
    description:
      "Platforms that prioritize bitrate, HDR-friendly masters, and crisp playback.",
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
    slug: "amateur",
    label: "Amateur Porn Sites",
    description:
      "Creator-forward catalogs leaning on authenticity, community uploads, and niches.",
  },
  {
    slug: "dating-hookup",
    label: "Dating & Hookup Sites",
    description:
      "Matchmaking and casual dating — always follow local laws and safety best practices.",
  },
  {
    slug: "hentai-anime",
    label: "Hentai & Anime Porn",
    description:
      "Animated releases, subtitled drops, and niche tags common to Eastern studios.",
  },
  {
    slug: "cartoon",
    label: "Cartoon Porn",
    description:
      "Western-style animation parodies and stylized toons with episodic releases.",
  },
  {
    slug: "gaming",
    label: "Gaming & Sex Games",
    description:
      "Interactive fiction, sims, and browser titles blending gameplay with adult themes.",
  },
  {
    slug: "asmr",
    label: "ASMR Porn",
    description:
      "Audio-forward intimacy, binaural mics, and slow-burn pacing for headphone users.",
  },
  {
    slug: "fetish-bdsm",
    label: "Fetish & BDSM",
    description:
      "Consensual kink education, scene libraries, and communities with clear guidelines.",
  },
  {
    slug: "ebony",
    label: "Ebony Porn Sites",
    description:
      "Studios and tubes highlighting Black performers with fair representation and SEO clarity.",
  },
  {
    slug: "asian",
    label: "Asian Porn Sites",
    description:
      "Regional studios and aggregators with multilingual UI and diverse subgenres.",
  },
  {
    slug: "latina",
    label: "Latina Porn Sites",
    description:
      "Curated hubs focused on Latina performers, bilingual support, and Latin American studios.",
  },
  {
    slug: "milf",
    label: "MILF Porn Sites",
    description:
      "Mature-focused catalogs with story-forward scenes and experienced performer rosters.",
  },
  {
    slug: "lesbian-queer",
    label: "Lesbian & Queer Porn",
    description:
      "Queer-led productions, ethical casting notes, and inclusive discovery filters.",
  },
  {
    slug: "solo-female",
    label: "Solo Female / Masturbation Sites",
    description:
      "Solo performances, toy-forward scenes, and intimate cam-adjacent archives.",
  },
  {
    slug: "gay-male",
    label: "Male Gay Porn Sites",
    description:
      "Gay studios and tubes with strong search facets, HD scenes, and community features.",
  },
  {
    slug: "trans",
    label: "Trans & Gender-diverse Sites",
    description:
      "Trans-led labels and allies with respectful metadata and performer-first marketing.",
  },
  {
    slug: "vintage",
    label: "Vintage / Classic Porn",
    description:
      "Remastered classics, retro aesthetics, and historical archives for collectors.",
  },
  {
    slug: "public-outdoor",
    label: "Public & Outdoor",
    description:
      "Fantasy-forward outdoor sets — editorially flagged for consent-forward productions only.",
  },
  {
    slug: "celebrity",
    label: "Celebrity & Fappening",
    description:
      "Gossip-adjacent indexes — we only list destinations that comply with DMCA and privacy law.",
  },
  {
    slug: "stories",
    label: "Story & Literotica Sites",
    description:
      "Long-form fiction, serialized chapters, and community writing with moderation tools.",
  },
  {
    slug: "blogs-reviews",
    label: "Porn Blogs & Review Sites",
    description:
      "Editorial roundups, deal trackers, and safety explainers that complement directories.",
  },
  {
    slug: "tube-gifs",
    label: "Tube Sites (webms, GIFs)",
    description:
      "Short-loop libraries, meme-friendly clips, and lightweight mobile experiences.",
  },
  {
    slug: "sex-ed-toys",
    label: "Sex Education & Toys",
    description:
      "Wellness retailers, anatomy explainers, and toy reviews adjacent to adult media.",
  },
  {
    slug: "cam2cam",
    label: "Cam-to-Cam Platforms",
    description:
      "Private two-way sessions, HD cam stacks, and transparent per-minute pricing.",
  },
  {
    slug: "escort-meetup",
    label: "Escort & Meetup Sites (legal, age-verified)",
    description:
      "Directories that emphasize verification, safety resources, and jurisdiction-aware listings.",
  },
];

export function getCategoryBySlug(slug: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export const categorySlugs = CATEGORIES.map((c) => ({
  slug: c.slug,
  label: c.label,
}));
