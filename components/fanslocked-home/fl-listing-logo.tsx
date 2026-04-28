"use client";

/* eslint-disable @next/next/no-img-element -- Remote logos need referrerPolicy + onError chain; next/image breaks many CDNs. */

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { getSiteImage } from "@/lib/get-site-image";
import { sitesFolderForCategorySlug } from "@/lib/category-sites-folder";
import { SITE_IMAGE_PLACEHOLDER } from "@/lib/site-image-constants";

type Props = {
  slug: string;
  categorySlug: string;
  websiteUrl: string;
  /** When the manifest has no match (e.g. Unsplash `listing.logo`). */
  fallbackLogo?: string | null;
  className?: string;
  /** Default `cover` for cards; `contain` for small logo tiles (e.g. category quick picks). */
  fit?: "cover" | "contain";
  /**
   * When false, never uses folder screenshots as a stand-in for logos (small tiles stay icons).
   * Favicon / letter fallbacks still apply. Default true for larger cards that only ship hero PNGs.
   */
  screenshotFallback?: boolean;
};

function faviconFromWebsite(websiteUrl: string): string | null {
  try {
    const host = new URL(websiteUrl).hostname.replace(/^www\./, "");
    if (!host) return null;
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=128`;
  } catch {
    return null;
  }
}

function letterDataUrl(websiteUrl: string): string {
  let letter = "?";
  try {
    const host = new URL(websiteUrl).hostname.replace(/^www\./, "");
    letter = (host.charAt(0) || "?").toUpperCase();
  } catch {
    /* keep */
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect fill="%231A1C24" width="64" height="64"/><text x="32" y="40" text-anchor="middle" fill="%235C6370" font-size="26" font-family="system-ui,sans-serif">${letter}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

/** Resolves logo via `getSiteImage(slug, "logo", …)`, then favicon / remote fallbacks. */
export function FlListingLogo({
  slug,
  categorySlug,
  websiteUrl,
  fallbackLogo,
  className,
  fit = "cover",
  screenshotFallback = true,
}: Props) {
  const resolved = useMemo(() => {
    const folder = sitesFolderForCategorySlug(categorySlug);
    return getSiteImage(slug, "logo", screenshotFallback, folder);
  }, [slug, categorySlug, screenshotFallback]);

  const chain = useMemo(() => {
    const raw = fallbackLogo?.trim() ?? null;
    const isPlaceholder =
      raw === SITE_IMAGE_PLACEHOLDER || raw?.endsWith("/placeholder.svg");
    /** Placeholder is not a real asset — skip it so Google favicon can run (search rail vs free-tube Unsplash). */
    const primary = resolved ?? (isPlaceholder ? null : raw);
    const a = [
      primary?.startsWith("/") ? primary : null,
      faviconFromWebsite(websiteUrl),
      primary && !primary.startsWith("/") ? primary : null,
      letterDataUrl(websiteUrl),
    ].filter((x): x is string => Boolean(x));
    return Array.from(new Set(a));
  }, [resolved, fallbackLogo, websiteUrl]);

  const [i, setI] = useState(0);
  const safe = Math.min(i, chain.length - 1);
  const src = chain[safe]!;

  return (
    <img
      key={src}
      src={src}
      alt=""
      width={56}
      height={56}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      className={cn(
        "h-full w-full",
        fit === "contain" ? "object-contain" : "object-cover",
        className,
      )}
      onError={() =>
        setI((x) => (x < chain.length - 1 ? x + 1 : x))
      }
    />
  );
}
