"use client";

/* eslint-disable @next/next/no-img-element -- Remote logos need referrerPolicy + onError chain; next/image breaks many CDNs. */

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  logo: string;
  websiteUrl: string;
  className?: string;
};

function faviconFromClearbit(logoUrl: string): string | null {
  try {
    const u = new URL(logoUrl);
    if (u.hostname !== "logo.clearbit.com") return null;
    const domain = u.pathname.replace(/^\//, "").split("/")[0];
    if (!domain) return null;
    return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
  } catch {
    return null;
  }
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

/**
 * Clearbit often 404s or blocks optimized fetches; plain img + no-referrer + favicon fallbacks.
 */
export function FlListingLogo({ logo, websiteUrl, className }: Props) {
  const chain = useMemo(() => {
    /** Google favicon first — Clearbit often 404s in browser. */
    const a = [
      faviconFromWebsite(websiteUrl),
      logo,
      faviconFromClearbit(logo),
      letterDataUrl(websiteUrl),
    ].filter((x): x is string => Boolean(x));
    return Array.from(new Set(a));
  }, [logo, websiteUrl]);

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
      className={cn("h-full w-full object-cover", className)}
      onError={() =>
        setI((x) => (x < chain.length - 1 ? x + 1 : x))
      }
    />
  );
}
