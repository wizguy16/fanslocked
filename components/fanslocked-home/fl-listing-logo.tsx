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
  /** When set, treat `fallbackLogo` as absent if it matches the listing hero (`image`) URL. */
  heroImageUrl?: string | null;
  className?: string;
  /** Default `cover` for cards; `contain` for small logo tiles (e.g. category quick picks). */
  fit?: "cover" | "contain";
  /**
   * When false, never uses folder screenshots as a stand-in for logos (small tiles stay icons).
   * Favicon / letter fallbacks still apply. Default true for larger cards that only ship hero PNGs.
   */
  screenshotFallback?: boolean;
  /**
   * Circular slot: full-bleed `object-cover` crop (`rounded-full` + `overflow-hidden`) so the mark
   * fills the circle like native avatar badges. SVG letter fallback uses a filled circle + centered glyph.
   */
  slotShape?: "default" | "circle";
};

/** Inline SVG letter fallback from `letterDataUrl` — do not treat like a raster logo crop. */
function isLetterFallbackSrc(src: string): boolean {
  return src.startsWith("data:image/svg+xml");
}

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
  heroImageUrl,
  className,
  fit = "cover",
  screenshotFallback = true,
  slotShape = "default",
}: Props) {
  const resolved = useMemo(() => {
    const folder = sitesFolderForCategorySlug(categorySlug);
    return getSiteImage(slug, "logo", screenshotFallback, folder);
  }, [slug, categorySlug, screenshotFallback]);

  const chain = useMemo(() => {
    const raw = fallbackLogo?.trim() ?? null;
    const hero = heroImageUrl?.trim() ?? "";
    const duplicatesHero = Boolean(raw && hero && raw === hero);
    const isPlaceholder =
      raw === SITE_IMAGE_PLACEHOLDER || raw?.endsWith("/placeholder.svg");
    /** Placeholder / duplicate hero is not a real logo tile — skip so favicon + letter run (matches `listingLogoImageSrc` rules). */
    const primary =
      resolved ??
      (isPlaceholder || duplicatesHero ? null : raw);
    const a = [
      primary?.startsWith("/") ? primary : null,
      faviconFromWebsite(websiteUrl),
      primary && !primary.startsWith("/") ? primary : null,
      letterDataUrl(websiteUrl),
    ].filter((x): x is string => Boolean(x));
    return Array.from(new Set(a));
  }, [resolved, fallbackLogo, heroImageUrl, websiteUrl]);

  const [i, setI] = useState(0);
  const safe = Math.min(i, chain.length - 1);
  const src = chain[safe]!;

  const onError = () =>
    setI((x) => (x < chain.length - 1 ? x + 1 : x));

  if (slotShape === "circle") {
    const letterFallback = isLetterFallbackSrc(src);

    if (letterFallback) {
      return (
        <div
          className={cn(
            "relative isolate h-full w-full min-h-0 min-w-0",
            className,
          )}
        >
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-neutral-800 ring-1 ring-white/10">
            <img
              key={src}
              src={src}
              alt=""
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={onError}
              className="h-[56%] w-[56%] object-contain object-center opacity-95"
            />
          </div>
        </div>
      );
    }

    return (
      <div
        className={cn(
          "relative isolate h-full w-full min-h-0 min-w-0",
          className,
        )}
      >
        <div className="relative h-full w-full overflow-hidden rounded-full">
          <img
            key={src}
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={onError}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative isolate h-full w-full min-h-0 min-w-0 overflow-hidden",
        className,
      )}
    >
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
          "h-full w-full max-h-full max-w-full",
          fit === "contain" ? "object-contain" : "object-cover",
        )}
        onError={onError}
      />
    </div>
  );
}
