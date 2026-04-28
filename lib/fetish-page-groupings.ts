import type { Listing } from "@/types/listing";
import { FETISH_FEATURED } from "@/lib/curated-fetish-bdsm";

function haystack(l: Listing): string {
  return `${l.name} ${l.description} ${l.preview ?? ""}`.toLowerCase();
}

function byRating(items: Listing[]): Listing[] {
  return [...items].sort((a, b) => b.rating - a.rating);
}

type SliceRule = {
  title: string;
  slugSet: ReadonlySet<string>;
  text?: RegExp;
};

const SLICE_RULES: SliceRule[] = [
  {
    title: "Femdom & Domination",
    slugSet: new Set([
      "iwantclips-fetish",
      "domination",
      "femdomxxx",
      "femdomup",
      "youngdommes",
    ]),
    text: /\b(femdom|mistress|humiliation|domme|female domination|domination)\b/i,
  },
  {
    title: "Hardcore & Extreme",
    slugSet: new Set([
      "motherless",
      "heavy-r",
      "pervertium",
      "ballbusting",
      "thisvid",
    ]),
    text: /\b(extreme|hardcore|taboo)\b/i,
  },
  {
    title: "Hypno & Mind Control",
    slugSet: new Set(["hypnotube"]),
    text: /\b(hypno|hypnot|mind control)\b/i,
  },
  {
    title: "Feet & Stockings",
    slugSet: new Set([]),
    text: /\b(feet|foot|stocking|stockings|sock|socks|heel|heels|nylon)\b/i,
  },
  {
    title: "Bondage & Rope",
    slugSet: new Set([
      "bondage",
      "boundhub",
      "bdsmx",
      "fetish-network",
      "kink",
      "kinkvr-fetish",
    ]),
    text: /\b(bondage|rope|bound|restraint|shibari)\b/i,
  },
];

export function getFetishFeaturedListings(all: Listing[], count = 4): Listing[] {
  const bySlug = new Map(all.map((l) => [l.slug, l]));
  const ordered: Listing[] = [];
  for (const row of FETISH_FEATURED) {
    const found = bySlug.get(row.slug);
    if (found) ordered.push(found);
    if (ordered.length >= count) break;
  }
  if (ordered.length >= count) return ordered.slice(0, count);
  const picked = new Set(ordered.map((l) => l.slug));
  const rest = byRating(all.filter((l) => !picked.has(l.slug)));
  return [...ordered, ...rest].slice(0, count);
}

export function groupFetishListings(
  listings: Listing[],
  excludeSlugs: ReadonlySet<string>,
): { title: string; items: Listing[] }[] {
  const pool = listings.filter((l) => !excludeSlugs.has(l.slug));
  const used = new Set<string>();
  const sections: { title: string; items: Listing[] }[] = [];

  for (const rule of SLICE_RULES) {
    const items = pool.filter((l) => {
      if (used.has(l.slug)) return false;
      if (rule.slugSet.has(l.slug)) return true;
      if (rule.text?.test(haystack(l))) return true;
      return false;
    });
    items.forEach((l) => used.add(l.slug));
    if (items.length > 0) {
      sections.push({ title: rule.title, items: byRating(items) });
    }
  }

  const remainder = pool.filter((l) => !used.has(l.slug));
  if (remainder.length > 0) {
    sections.push({
      title: "Other curated picks",
      items: byRating(remainder),
    });
  }

  return sections;
}
