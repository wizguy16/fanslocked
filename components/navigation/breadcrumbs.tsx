"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { getSiteUrl } from "@/lib/site";
import { usesGlobalSiteNavbar } from "@/lib/site-layout";
import { cn } from "@/lib/utils";

export type BreadcrumbsProps = {
  /** Absolute site origin for JSON-LD `item` URLs (no trailing slash). */
  baseUrl?: string;
  /** Lowercase URL segment → display label. Overrides built-in defaults. */
  labelMap?: Record<string, string>;
  /** Align width/padding with a local page grid (e.g. explore `max-w-[1600px]`). */
  containerClassName?: string;
  /** Extra classes on the `<nav>` wrapper. */
  className?: string;
};

/** Built-in segment labels; merged with `labelMap` (user wins). */
const DEFAULT_LABEL_MAP: Record<string, string> = {
  site: "Platforms",
  category: "Category",
  categories: "Categories",
  blog: "Guides",
};

function mergeLabelMaps(
  custom?: Record<string, string>,
): Record<string, string> {
  return { ...DEFAULT_LABEL_MAP, ...custom };
}

function safeDecode(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

function formatSegmentLabel(segment: string): string {
  const decoded = safeDecode(segment);
  const words = decoded.replace(/-/g, " ").split(/\s+/).filter(Boolean);
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

type Crumb = { href: string; label: string };

function buildCrumbs(
  pathname: string,
  labelMap: Record<string, string>,
): Crumb[] {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: Crumb[] = [{ href: "/", label: "Home" }];
  let acc = "";
  for (const segment of segments) {
    acc += `/${segment}`;
    const key = segment.toLowerCase();
    const label =
      labelMap[key] ?? formatSegmentLabel(segment);
    crumbs.push({ href: acc, label });
  }
  return crumbs;
}

function absoluteItemUrl(baseUrl: string, href: string): string {
  const base = baseUrl.replace(/\/$/, "");
  if (href === "/" || href === "") return `${base}/`;
  return `${base}${href.startsWith("/") ? href : `/${href}`}`;
}

export function Breadcrumbs({
  baseUrl,
  labelMap,
  containerClassName,
  className,
}: BreadcrumbsProps) {
  const pathname = usePathname() ?? "/";
  const resolvedBase = baseUrl ?? getSiteUrl();
  const mergedMap = useMemo(() => mergeLabelMaps(labelMap), [labelMap]);

  const crumbs = useMemo(
    () => buildCrumbs(pathname, mergedMap),
    [pathname, mergedMap],
  );

  const jsonLd = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
        item: absoluteItemUrl(resolvedBase, c.href),
      })),
    };
  }, [crumbs, resolvedBase]);

  if (pathname === "/" || pathname === "") {
    return null;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <nav
        aria-label="Breadcrumb"
        className={cn("mb-4 mt-2 text-sm text-neutral-400", className)}
      >
        <div
          className={cn(
            "mx-auto max-w-7xl px-4 sm:px-4 md:px-6",
            containerClassName,
          )}
        >
          <ol className="flex flex-wrap items-center gap-2">
            {crumbs.map((crumb, i) => {
              const isLast = i === crumbs.length - 1;
              return (
                <li
                  key={`${i}-${crumb.href}`}
                  className="flex items-center gap-2"
                  {...(isLast ? { "aria-current": "page" as const } : {})}
                >
                  {i > 0 ? (
                    <span
                      className="select-none text-neutral-500"
                      aria-hidden
                    >
                      /
                    </span>
                  ) : null}
                  {isLast ? (
                    <span className="font-medium text-white">{crumb.label}</span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="transition hover:text-white"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}

/** Use under the shared navbar in root layout; omit on routes with a local header. */
export function LayoutBreadcrumbs(props: BreadcrumbsProps) {
  const pathname = usePathname() ?? "/";
  if (!usesGlobalSiteNavbar(pathname)) return null;
  return <Breadcrumbs {...props} />;
}
