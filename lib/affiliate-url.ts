/**
 * In-app exit URL. `GET /out/[slug]` resolves `slug` via `resolveAffiliateDestination`
 * (cookie overrides → registry) with fallback to `listing.website_url` (302).
 */
export function buildListingOutboundPath(slug: string): string {
  return `/out/${slug}`;
}
