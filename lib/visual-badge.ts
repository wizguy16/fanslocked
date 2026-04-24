export type VisualBadgeKind = "trending" | "live" | "new" | "top";

export type VisualBadge = {
  kind: VisualBadgeKind;
  label: string;
};

const BADGES: VisualBadge[] = [
  { kind: "trending", label: "Trending" },
  { kind: "live", label: "Live" },
  { kind: "new", label: "New" },
  { kind: "top", label: "Top" },
];

/** Stable pseudo-random badge per listing (scan-friendly, not truly random per paint). */
export function pickVisualBadge(listingId: string, index: number): VisualBadge {
  let h = 0;
  for (let i = 0; i < listingId.length; i++) h = (h + listingId.charCodeAt(i) * (i + 1)) % 997;
  const idx = (h + index * 13) % BADGES.length;
  return BADGES[idx]!;
}

const TOP_LABELS = new Set(["top", "editor pick", "editor's pick"]);

/** Curated `listing.badge` wins; otherwise stable pseudo-random. */
export function resolveVisualBadge(
  listingId: string,
  index: number,
  badge?: string,
): VisualBadge {
  if (badge?.trim()) {
    const lower = badge.trim().toLowerCase();
    if (lower.includes("trend")) return { kind: "trending", label: badge.trim() };
    if (lower.includes("live")) return { kind: "live", label: badge.trim() };
    if (lower.includes("new")) return { kind: "new", label: badge.trim() };
    if (TOP_LABELS.has(lower) || lower.includes("top"))
      return { kind: "top", label: badge.trim() };
    return { kind: "new", label: badge.trim() };
  }
  return pickVisualBadge(listingId, index);
}

