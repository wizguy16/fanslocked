import type { Listing } from "@/types/listing";

/** Ordered for Top picks: publisher → community → marketplace → RPG → creator rails. */
export const GAMING_TOP_PICK_SLUGS = [
  "nutaku",
  "erolabs",
  "f95zone",
  "itch-adult",
  "hentaiheroes",
  "patreon-subscribestar",
] as const;

export function buildGamingPrestigeSlices(capped: Listing[]) {
  const bySlug = new Map(capped.map((l) => [l.slug, l]));
  const showcase = GAMING_TOP_PICK_SLUGS.map((s) => bySlug.get(s)).filter(
    (l): l is Listing => Boolean(l),
  );
  const heroIds = new Set(showcase.map((l) => l.id));
  const rest = capped.filter((l) => !heroIds.has(l.id));
  return {
    quick: rest.slice(0, 4),
    showcase,
    rising: rest.slice(4),
  };
}
