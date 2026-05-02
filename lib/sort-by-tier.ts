export type TierSortKey = "tier1" | "tier2" | "tier3";

const TIER_ORDER: Record<TierSortKey, number> = {
  tier1: 0,
  tier2: 1,
  tier3: 2,
};

export type WithAffiliateTier = { tier: TierSortKey };

/**
 * Stable tier ordering: tier1 first, then tier2, then tier3. Relative order within
 * the same tier is preserved.
 */
export function sortByTier<T extends WithAffiliateTier>(sites: T[]): T[] {
  return [...sites].sort(
    (a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier],
  );
}
