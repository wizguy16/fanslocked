/**
 * Optional editorial overrides for category prestige pages.
 * When `getCategoryPrestigeEditorial` returns null, shells use category metadata only.
 */

export type CategoryPrestigeEditorial = {
  heroTitle: string;
  heroDescription: string;
  /** One blurb per showcase row (top 5 after quick picks), in rating order. */
  showcaseBlurbs: readonly string[];
  /** One blurb per rising grid card, in rating order. */
  risingBlurbs: readonly string[];
  whatMakesHeading: string;
  whatMakesBullets: readonly string[];
  freeVsPremiumHeading: string;
  freeVsPremiumBody: string;
  whoForHeading: string;
  whoForBody: string;
  finalCtaBody: string;
};

export function getCategoryPrestigeEditorial(
  slug: string,
  year: number,
): CategoryPrestigeEditorial | null {
  if (slug !== "fetish-bdsm") return null;

  return {
    heroTitle: `Best Fetish & BDSM Sites (${year})`,
    heroDescription:
      "Curated platforms covering domination, bondage, fetish clips, and creator-driven content. Selected for consistency, safety standards, and depth across niche categories.",
    showcaseBlurbs: [
      "One of the most established BDSM networks, with studio-produced scenes covering a wide range of kinks. Strong production quality and structured categories make it easy to find specific content without digging.",
      "A massive marketplace built around independent creators. Best for niche exploration, with thousands of categories ranging from mainstream fetish to highly specific interests.",
      "Blends premium content with creator interaction. Offers a mix of clips, custom content, and community-driven features, making it a flexible option depending on what you're looking for.",
      "Focused heavily on fetish creators, especially in domination and roleplay categories. Clean interface and strong tagging system help surface very targeted content quickly.",
      "One of the largest fetish-focused communities, combining content with dating and interaction. More community-driven than studio platforms, with a focus on connection and exploration.",
    ],
    risingBlurbs: [
      "Large archive of user-submitted fetish content with consistent updates.",
      "Focused on hardcore niches with minimal filtering.",
      "Community-driven platform with active uploads and tagging.",
      "Clip-based content with strong category filtering.",
      "Wide variety of amateur fetish content across multiple niches.",
      "Emphasis on domination and roleplay-focused scenes.",
      "Fast-loading platform with simple navigation and minimal friction.",
      "Strong mix of free and premium fetish clips.",
      "Regular uploads with a focus on specific kink categories.",
      "Straightforward browsing with minimal distractions.",
      "Large volume of content, though quality varies by upload.",
      "Good for discovering less mainstream fetish content.",
      "Broad selection with a mix of curated and user-generated material.",
    ],
    whatMakesHeading: "What makes a good Fetish & BDSM site?",
    whatMakesBullets: [
      "Clear categorization of niche content without over-filtering",
      "Consistent uploads to keep libraries active",
      "Reliable playback and minimal friction accessing content",
      "Transparent creator or studio sourcing",
    ],
    freeVsPremiumHeading: "Free vs premium",
    freeVsPremiumBody:
      "Free platforms offer accessibility and volume, but often rely on ads and inconsistent quality. Premium platforms tend to deliver better production, cleaner navigation, and more reliable content across specific niches.",
    whoForHeading: "Who this is for",
    whoForBody:
      "This category is suited for both first-time explorers and experienced users looking for specific content. Some platforms prioritize accessibility and variety, while others focus on depth within particular fetish segments.",
    finalCtaBody:
      "Ready to explore deeper categories and more specific content? Start with the platforms above and follow through to find what fits your preferences.",
  };
}
