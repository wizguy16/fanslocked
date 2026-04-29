/**
 * Guide routes for sitemap when Node fs is unavailable (e.g. Edge) or scan fails.
 * Keep aligned with folders under app/guides that contain page.tsx.
 */
export const FALLBACK_GUIDE_SLUGS: readonly string[] = [
  "onlyfans-alternatives",
];

/**
 * Discovers guide folders with page.tsx under app/guides at build/request time on Node.
 * Falls back to FALLBACK_GUIDE_SLUGS when filesystem APIs cannot run.
 */
export async function getGuideSlugs(): Promise<string[]> {
  try {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const guidesDir = path.join(process.cwd(), "app", "guides");
    if (!fs.existsSync(guidesDir)) return [];
    return fs
      .readdirSync(guidesDir, { withFileTypes: true })
      .filter(
        (d) =>
          d.isDirectory() &&
          fs.existsSync(path.join(guidesDir, d.name, "page.tsx")),
      )
      .map((d) => d.name);
  } catch {
    return [...FALLBACK_GUIDE_SLUGS];
  }
}
