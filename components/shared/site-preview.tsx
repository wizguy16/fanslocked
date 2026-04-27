"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getSiteImage } from "@/lib/get-site-image";
import { sitesFolderForCategorySlug } from "@/lib/category-sites-folder";

type SitePreviewProps = {
  slug: string;
  categorySlug: string;
  /** Use listing name for meaningful previews; pass "" only when decorative. */
  alt: string;
  /** When the manifest has no hero (e.g. Unsplash `listing.image`). */
  fallbackScreenshot?: string | null;
  /** Tile fallback when screenshot missing or broken (e.g. `listing.logo`). */
  fallbackLogo?: string | null;
  sizes?: string;
  /** Optional overlay (e.g. rank badge). Keep pointer-events off unless needed. */
  overlay?: ReactNode;
  /** Extra classes on the outer frame (borders, aspect, margin). */
  className?: string;
  /** Classes on the screenshot `<Image>` when shown. */
  imageClassName?: string;
};

/**
 * Preview rail: `getSiteImage(slug, "screenshot", true)` for the hero, then logo tile
 * via `getSiteImage(slug, "logo", true)`, then optional remote fallbacks.
 */
export function SitePreview({
  slug,
  categorySlug,
  alt,
  fallbackScreenshot,
  fallbackLogo,
  sizes = "(max-width: 768px) 100vw, 50vw",
  overlay,
  className,
  imageClassName,
}: SitePreviewProps) {
  const [broken, setBroken] = useState(false);

  const { hero, tileSrc } = useMemo(() => {
    const folder = sitesFolderForCategorySlug(categorySlug);
    const resolvedShot = getSiteImage(slug, "screenshot", true, folder);
    const resolvedLogo = getSiteImage(slug, "logo", true, folder);
    const fbShot = fallbackScreenshot?.trim() ?? "";
    const fbLogo = fallbackLogo?.trim() ?? "";
    const heroUrl = resolvedShot ?? (fbShot || null);
    const tile =
      resolvedLogo ??
      resolvedShot ??
      (fbLogo || null) ??
      (fbShot || null) ??
      null;
    return { hero: heroUrl, tileSrc: tile };
  }, [slug, categorySlug, fallbackScreenshot, fallbackLogo]);

  useEffect(() => {
    setBroken(false);
  }, [hero]);

  const trimmedHero = hero?.trim() ?? "";
  const trimmedTile = tileSrc?.trim() ?? "";
  const showScreenshot = Boolean(trimmedHero) && !broken;

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-lg border border-[#564338] bg-[#1e1f25]",
        className,
      )}
    >
      {overlay ? (
        <div className="pointer-events-none absolute inset-0 z-[2] [&>*]:pointer-events-auto">
          {overlay}
        </div>
      ) : null}

      <div className="absolute inset-0 z-0">
        {showScreenshot ? (
          <Image
            src={trimmedHero}
            alt={alt}
            fill
            className={cn("object-cover", imageClassName)}
            sizes={sizes}
            onError={() => setBroken(true)}
          />
        ) : trimmedTile ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#2a2b32] to-[#16171c] p-6">
            <Image
              src={trimmedTile}
              alt={alt}
              width={120}
              height={48}
              className="h-10 max-h-14 w-auto object-contain opacity-90"
            />
          </div>
        ) : (
          <div
            className="h-full w-full bg-gradient-to-br from-[#2a2b32] to-[#16171c]"
            aria-hidden
          />
        )}
      </div>
    </div>
  );
}
