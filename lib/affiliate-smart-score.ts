import type { AffiliateStatus } from "@/lib/affiliate-registry";
import { getAffiliateRegistryEntry } from "@/lib/affiliate-registry";
import { getClickScore } from "@/lib/click-tracking";

function tierWeight(tier: "tier1" | "tier2" | "tier3"): number {
  if (tier === "tier1") return 30;
  if (tier === "tier2") return 20;
  return 10;
}

/**
 * Lightweight ranking signal: monetization flags + tier + log-scaled clicks (decay bias).
 */
export function computeAffiliateSmartScore(
  slug: string,
  clickCount?: number,
  opts?: { workflowStatus?: AffiliateStatus },
): number {
  const entry = getAffiliateRegistryEntry(slug);
  const rawClicks = clickCount ?? getClickScore(slug);
  const adjustedClicks = Math.log(rawClicks + 1) * 10;
  const hasAffiliateProgram = Boolean(entry?.hasAffiliate);
  const hasTrackedUrl = Boolean(entry?.affiliateUrl?.trim());
  const monetizationBoost = hasTrackedUrl ? 100 : hasAffiliateProgram ? 50 : 0;
  const statusBoost =
    opts?.workflowStatus === "approved"
      ? 50
      : opts?.workflowStatus === "applied"
        ? 25
        : opts?.workflowStatus === "researching"
          ? 10
          : 0;
  const tier = entry?.tier ? tierWeight(entry.tier) : 0;
  return monetizationBoost + statusBoost + tier + adjustedClicks * 2;
}
