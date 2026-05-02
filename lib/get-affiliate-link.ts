import {
  AFFILIATE_LINK_OVERRIDE_COOKIE,
} from "@/lib/affiliate-constants";
import { getAffiliateRegistryEntry } from "@/lib/affiliate-registry";

function safeParseOverrideJson(raw: string): Record<string, string> {
  try {
    const decoded = decodeURIComponent(raw.trim());
    const o = JSON.parse(decoded) as unknown;
    if (!o || typeof o !== "object") return {};
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(o)) {
      if (typeof v === "string" && v.trim()) out[k] = v.trim();
    }
    return out;
  } catch {
    return {};
  }
}

/** Parse `fl_affiliate_overrides` from a raw `Cookie` header value. */
export function parseAffiliateOverridesFromCookieHeader(
  cookieHeader: string | null,
): Record<string, string> {
  if (!cookieHeader?.trim()) return {};
  const parts = cookieHeader.split(";").map((p) => p.trim());
  const prefix = `${AFFILIATE_LINK_OVERRIDE_COOKIE}=`;
  for (const p of parts) {
    if (!p.startsWith(prefix)) continue;
    return safeParseOverrideJson(p.slice(prefix.length));
  }
  return {};
}

/**
 * Registry-only resolution (code + env). Does not read browser cookie overrides.
 */
export function getAffiliateLink(slug: string): string | undefined {
  const entry = getAffiliateRegistryEntry(slug);
  if (!entry) return undefined;
  const tracked = entry.affiliateUrl?.trim();
  if (tracked) return tracked;
  return entry.baseUrl;
}

/**
 * Final outbound URL: pasted override cookie → registry `affiliateUrl` → `baseUrl`.
 * Used by `/out` and server-rendered partner links when cookies are available.
 *
 * Admin UI persists overrides into the `fl_affiliate_overrides` cookie (synced from
 * `affiliate_status_v1` localStorage) so server redirects pick them up without a database.
 */
export function resolveAffiliateDestination(
  slug: string,
  cookieHeader: string | null | undefined,
): string | undefined {
  const fromCookie = parseAffiliateOverridesFromCookieHeader(
    cookieHeader ?? null,
  )[slug]?.trim();
  if (fromCookie) return fromCookie;
  return getAffiliateLink(slug);
}
