/**
 * In-app exit URL. `GET /out/[slug]` resolves `slug` → `website_url` (302).
 * Swap the route later for tracked redirects without changing card hrefs.
 */
export function buildListingOutboundPath(slug: string): string {
  return `/out/${slug}`;
}
