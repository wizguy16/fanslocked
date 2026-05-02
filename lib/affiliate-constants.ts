/** Cookie written by admin UI so `/out/[slug]` can apply pasted affiliate URLs (server-readable). */
export const AFFILIATE_LINK_OVERRIDE_COOKIE = "fl_affiliate_overrides";

/**
 * Workflow + pasted URLs: `localStorage` key `affiliate_status_v1` (see
 * `lib/affiliate-status-store.ts`). Legacy per-slug keys are migrated once.
 */
