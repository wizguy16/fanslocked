/**
 * Central affiliate exit URL. Swap `NEXT_PUBLIC_AFFILIATE_BASE` in env to
 * retarget all listings; optional per-site overrides can be layered later.
 */
export function buildAffiliateRedirectUrl(siteKey: string): string {
  const base =
    process.env.NEXT_PUBLIC_AFFILIATE_BASE?.replace(/\/$/, "") ??
    "https://fanslocked.example/out";
  return `${base}?site=${encodeURIComponent(siteKey)}`;
}
