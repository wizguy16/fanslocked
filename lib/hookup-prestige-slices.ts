import type { Listing } from "@/types/listing";
import { selectCategoryTopPicks } from "@/lib/category-prestige-top-picks";

/** Trust-first rail: recognizable brands before monetized picks. */
const HOOKUP_TRUST_ORDER = [
  "tinder",
  "adultfriendfinder",
  "ashley-madison",
  "benaughty",
  "kasual",
  "pure",
] as const;

/** Conversion picks shown first in the lower grid. */
const HOOKUP_MONETIZATION_ORDER = [
  "snapsext",
  "friendfinder-x",
  "xmatch",
  "instabang",
  "together2night",
] as const;

/** Prestige Top picks band matches legacy trust rail length (six). */
const HOOKUP_SHOWCASE_LIMIT = 6;

export function buildHookupPrestigeSlices(capped: Listing[]) {
  const bySlug = new Map(capped.map((l) => [l.slug, l]));
  const dataTrust = selectCategoryTopPicks(capped, "hookup", HOOKUP_SHOWCASE_LIMIT);
  const trust =
    dataTrust ??
    HOOKUP_TRUST_ORDER.map((s) => bySlug.get(s)).filter(
      (l): l is Listing => Boolean(l),
    );
  const trustIds = new Set(trust.map((l) => l.id));
  const monetization = HOOKUP_MONETIZATION_ORDER.map((s) => bySlug.get(s)).filter(
    (l): l is Listing => l !== undefined && !trustIds.has(l.id),
  );
  const monoIds = new Set(monetization.map((l) => l.id));
  const rest = capped.filter((l) => !trustIds.has(l.id) && !monoIds.has(l.id));

  return {
    quick: [] as Listing[],
    showcase: trust,
    rising: [...monetization, ...rest],
  };
}
