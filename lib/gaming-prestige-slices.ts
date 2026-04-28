import type { Listing } from "@/types/listing";

/** Exactly four — compact row above Top picks (legacy order). */
export const GAMING_QUICK_PICK_SLUGS = [
  "gamejolt-adult",
  "adultgamecity",
  "porngames",
  "3dxchat",
] as const;

/** Full-width Top picks (order + copy in `category-prestige-editorial` blurbs). */
export const GAMING_TOP_PICK_SLUGS = [
  "nutaku",
  "erolabs",
  "hentaiheroes",
  "grand-bang-auto",
  "itch-adult",
] as const;

export function buildGamingPrestigeSlices(capped: Listing[]) {
  const bySlug = new Map(capped.map((l) => [l.slug, l]));
  const quick = GAMING_QUICK_PICK_SLUGS.map((s) => bySlug.get(s)).filter(
    (l): l is Listing => Boolean(l),
  );
  const showcase = GAMING_TOP_PICK_SLUGS.map((s) => bySlug.get(s)).filter(
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
