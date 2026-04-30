export type HeroCTA = {
  primary: string;
  secondary: string;
  primaryHref: string;
  secondaryHref: string;
};

function normalizePath(pathname: string | null | undefined): string {
  if (pathname == null || pathname === "") return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function categorySlugFromPath(path: string): string {
  if (path.startsWith("/category/")) {
    return path.slice("/category/".length).split("/")[0] ?? "";
  }
  if (path.startsWith("/categories/")) {
    return path.slice("/categories/".length).split("/")[0] ?? "";
  }
  return "";
}

function formatSlug(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getHeroCTA(
  pathname: string | null | undefined,
  params?: { slug?: string; siteUrl?: string },
): HeroCTA {
  const path = normalizePath(pathname);
  if (path === "/explore") {
    return {
      primary: "Start Exploring",
      secondary: "View Categories",
      primaryHref: "/explore?sort=trending",
      secondaryHref: "/categories",
    };
  }

  if (path.startsWith("/category/") || path.startsWith("/categories/")) {
    const slug = params?.slug || categorySlugFromPath(path);
    const formatted = formatSlug(slug);
    return {
      primary: `Explore ${formatted} Platforms`,
      secondary: "View All Categories",
      primaryHref: "#category-listings",
      secondaryHref: "/categories",
    };
  }

  if (path.startsWith("/site/")) {
    return {
      primary: "Visit Platform",
      secondary: "Back to Explore",
      primaryHref: params?.siteUrl ?? "#",
      secondaryHref: "/explore",
    };
  }

  return {
    primary: "Start Exploring",
    secondary: "View Categories",
    primaryHref: "/explore?sort=trending",
    secondaryHref: "/categories",
  };
}
