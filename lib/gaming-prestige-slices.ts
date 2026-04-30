import type { Listing } from "@/types/listing";
import { selectCategoryTopPicks } from "@/lib/category-prestige-top-picks";

/** Four strong titles — tier-2 featured + blockbusters (platforms live in Top picks). */
export const GAMING_QUICK_PICK_SLUGS = [
  "hentaiheroes",
  "grand-bang-auto",
  "summertime-saga",
  "3dxchat",
] as const;

/** Fallback Top picks — tier-1 platforms when `topPickRank` is absent. */
export const GAMING_TOP_PICK_SLUGS = [
  "nutaku",
  "erolabs",
  "gamelink-interactive",
  "itch-adult",
] as const;

const GAMING_SHOWCASE_LIMIT = 5;

export function buildGamingPrestigeSlices(capped: Listing[]) {
  const bySlug = new Map(capped.map((l) => [l.slug, l]));
  const quick = GAMING_QUICK_PICK_SLUGS.map((s) => bySlug.get(s)).filter(
    (l): l is Listing => Boolean(l),
  );
  const dataShowcase = selectCategoryTopPicks(capped, "gaming", GAMING_SHOWCASE_LIMIT);
  const showcase =
    dataShowcase ??
    GAMING_TOP_PICK_SLUGS.map((s) => bySlug.get(s)).filter(
      (l): l is Listing => Boolean(l),
    );
  const used = new Set<string>();
  for (const l of quick) used.add(l.id);
  for (const l of showcase) used.add(l.id);
  const rising = capped.filter((l) => !used.has(l.id));
  return {
    quick,
    showcase,
    rising,
  };
}
