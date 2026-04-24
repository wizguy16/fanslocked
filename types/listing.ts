export type Listing = {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  categoryLabel: string;
  tags: string[];
  /** Short hero blurb. */
  description: string;
  /** Longer editorial copy for review pages. */
  review: string;
  pros: string[];
  cons: string[];
  image: string;
  logo: string;
  affiliate_url: string;
  /** Representative destination for “direct” links (demo uses .example). */
  website_url: string;
  rating: number;
  added_date: string;
  popularity_score: number;
};

export type QuickFilterId = "all" | "free" | "trending" | "premium" | "new";
