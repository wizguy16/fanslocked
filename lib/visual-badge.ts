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

