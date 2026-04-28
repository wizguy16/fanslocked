/** Slice titles from `groupFetishListings` → hub ranking URLs + copy. */

export type FetishHubSectionCopy = {
  displayTitle: string;
  description: string;
  textLinkHref: string;
  textLinkLabel: string;
  ctaHref: string;
  ctaLabel: string;
};

const FEMDOM_KEY = "Femdom & Domination";
const HARDCORE_KEY = "Hardcore & Extreme";
const HYPNO_KEY = "Hypno & Mind Control";
const FEET_KEY = "Feet & Stockings";
const BONDAGE_KEY = "Bondage & Rope";

export function getFetishHubSectionCopy(
  sliceTitle: string,
  year: number,
): FetishHubSectionCopy | null {
  switch (sliceTitle) {
    case FEMDOM_KEY:
      return {
        displayTitle: `Femdom & Domination Sites (${year})`,
        description:
          "Explore the best femdom and domination sites featuring power dynamics, POV control, and creator-driven content. These platforms focus on dominance-based interactions, structured scenarios, and consistent niche content.",
        textLinkHref: "/fetish/femdom-sites",
        textLinkLabel: "View full Femdom site rankings",
        ctaHref: "/fetish/femdom-sites",
        ctaLabel: "View All Femdom Sites",
      };
    case BONDAGE_KEY:
      return {
        displayTitle: `Bondage & Rope Sites (${year})`,
        description:
          "Discover bondage and rope-focused platforms featuring restraint, discipline, and structured fetish scenarios. These sites range from studio-quality productions to niche-specific creators.",
        textLinkHref: "/fetish/bondage-sites",
        textLinkLabel: "Explore Bondage & Rope sites",
        ctaHref: "/fetish/bondage-sites",
        ctaLabel: "Explore Bondage Sites",
      };
    case HARDCORE_KEY:
      return {
        displayTitle: `Hardcore & Extreme BDSM Sites (${year})`,
        description:
          "Browse extreme fetish and hardcore BDSM platforms with deeper, more intense content categories. These sites prioritize niche depth, raw content, and less-filtered experiences.",
        textLinkHref: "/fetish/extreme-bdsm-sites",
        textLinkLabel: "View Hardcore & Extreme sites",
        ctaHref: "/fetish/extreme-bdsm-sites",
        ctaLabel: "View All Hardcore Sites",
      };
    case HYPNO_KEY:
      return {
        displayTitle: `Hypno & Mind Control Sites (${year})`,
        description:
          "Explore hypno and mind-control fetish platforms focused on visual stimulation, looping content, and psychological immersion. Ideal for users looking for guided or repetitive fantasy experiences.",
        textLinkHref: "/fetish/hypno-sites",
        textLinkLabel: "View Hypno fetish sites",
        ctaHref: "/fetish/hypno-sites",
        ctaLabel: "View All Hypno Sites",
      };
    case FEET_KEY:
      return {
        displayTitle: `Feet & Stockings Fetish Sites (${year})`,
        description:
          "Find platforms dedicated to feet, stockings, and leg-focused fetish content. These sites include both amateur creators and curated niche collections.",
        textLinkHref: "/fetish/feet-fetish-sites",
        textLinkLabel: "Explore Feet & Stocking sites",
        ctaHref: "/fetish/feet-fetish-sites",
        ctaLabel: "Explore Feet & Stocking Sites",
      };
    default:
      return null;
  }
}

export const FETISH_HUB_SLUGS = [
  "femdom-sites",
  "bondage-sites",
  "extreme-bdsm-sites",
  "hypno-sites",
  "feet-fetish-sites",
] as const;

export type FetishHubSlug = (typeof FETISH_HUB_SLUGS)[number];

export const FETISH_HUB_PAGE_META: Record<
  FetishHubSlug,
  { title: string; intro: string }
> = {
  "femdom-sites": {
    title:
      "Best Femdom Sites (2026) – Top Domination Porn Sites & Female-Led Platforms",
    intro:
      "Explore the best femdom sites in 2026, including domination-focused platforms, POV control content, and creator-driven experiences.",
  },
  "bondage-sites": {
    title: "Best Bondage & Rope Sites (2026)",
    intro:
      "Ranked bondage and rope-focused destinations. Use the hub to compare platforms and jump to related fetish rankings.",
  },
  "extreme-bdsm-sites": {
    title: "Best Hardcore & Extreme BDSM Sites (2026)",
    intro:
      "Deep rankings for intense and niche-heavy BDSM platforms. Explore the hub for adjacent categories and editor picks.",
  },
  "hypno-sites": {
    title: "Best Hypno & Mind Control Fetish Sites (2026)",
    intro:
      "Hypno-focused site rankings with niche context. Browse the main fetish hub for more discovery paths.",
  },
  "feet-fetish-sites": {
    title: "Best Feet & Stockings Fetish Sites (2026)",
    intro:
      "Feet and stocking niche rankings. Link back to the central hub to explore femdom, bondage, and more.",
  },
};
