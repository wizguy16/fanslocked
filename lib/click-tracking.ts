/**
 * In-process outbound click counts. Ephemeral on serverless cold starts; upgrade to KV/DB later.
 */

const clicksBySlug = new Map<string, number>();

export function recordOutboundClick(slug: string): void {
  const key = slug.trim();
  if (!key) return;
  const next = (clicksBySlug.get(key) ?? 0) + 1;
  clicksBySlug.set(key, next);
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console -- intentional dev diagnostics
    console.info("[click-tracking]", { slug: key, count: next, at: Date.now() });
  }
}

export function getClickScore(slug: string): number {
  return clicksBySlug.get(slug.trim()) ?? 0;
}

export function getAllClickCounts(): Map<string, number> {
  return new Map(clicksBySlug);
}
