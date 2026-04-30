import type { Listing } from "@/types/listing";
import { selectCategoryTopPicks } from "@/lib/category-prestige-top-picks";

/** Fallback Top picks order when listings omit `topPickRank` (no quick picks for this vertical). */
const SEXCHAT_SHOWCASE_ORDER = [
  "sextpanther",
  "arousr",
  "niteflirt",
  "jerkmate",
] as const;

const SEXCHAT_SHOWCASE_LIMIT = 5;

/** First rows in “More sex chat & sexting platforms” — copy from category editorial blurbs. */
const SEXCHAT_RISING_LEAD_ORDER = [
  "textingfactory",
  "lipservice",
  "flirtbucks",
] as const;

export function buildSexChatPrestigeSlices(capped: Listing[]) {
  const bySlug = new Map(capped.map((l) => [l.slug, l]));
  const dataShowcase = selectCategoryTopPicks(capped, "sex-chat", SEXCHAT_SHOWCASE_LIMIT);
  const showcase =
    dataShowcase ??
    SEXCHAT_SHOWCASE_ORDER.map((s) => bySlug.get(s)).filter(
      (l): l is Listing => Boolean(l),
    );
  const showcaseIds = new Set(showcase.map((l) => l.id));
  const lead = SEXCHAT_RISING_LEAD_ORDER.map((s) => bySlug.get(s))
    .filter((l): l is Listing => Boolean(l))
    .filter((l) => !showcaseIds.has(l.id));
  const leadIds = new Set<string>(Array.from(showcaseIds));
  for (const l of lead) leadIds.add(l.id);
  const rest = capped.filter((l) => !leadIds.has(l.id));

  return {
    quick: [] as Listing[],
    showcase,
    rising: [...lead, ...rest],
  };
}
