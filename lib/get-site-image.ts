import { getSitesImageManifest, type ImageType } from "@/lib/image-manifest";
import { SITE_IMAGE_SLUG_ALIASES } from "@/lib/site-image-slug-aliases";
import { SITE_IMAGE_PLACEHOLDER } from "@/lib/site-image-constants";

export { SITE_IMAGE_PLACEHOLDER };

function slugKeys(slug: string): string[] {
  const lower = slug.toLowerCase();
  const keys: string[] = [];
  const aliases = SITE_IMAGE_SLUG_ALIASES[lower];
  if (aliases?.length) {
    for (const a of aliases) keys.push(a.toLowerCase());
  }
  keys.push(lower);
  const dehyphen = lower.replace(/-/g, "");
  if (dehyphen !== lower) keys.push(dehyphen);
  return Array.from(new Set(keys));
}

function lookupInMaps(
  maps: { screenshot: Record<string, string>; logo: Record<string, string> },
  keys: string[],
  type: ImageType,
  fallbackToOtherType: boolean,
): string | null {
  for (const k of keys) {
    const v = maps[type][k];
    if (v) return v;
  }
  if (fallbackToOtherType) {
    const other: ImageType = type === "screenshot" ? "logo" : "screenshot";
    for (const k of keys) {
      const v = maps[other][k];
      if (v) return v;
    }
  }
  return null;
}

/**
 * Best image path for a site slug. When `preferFolder` is set (e.g. `free`), that
 * directory is tried before other categories under `public/images/sites/`.
 */
export function getSiteImage(
  slug: string,
  type: ImageType = "screenshot",
  fallbackToOtherType = true,
  preferFolder?: string,
): string | null {
  const keys = slugKeys(slug);
  const manifest = getSitesImageManifest();

  const tryFolder = (folder: string): string | null => {
    const maps = manifest.byFolder[folder];
    if (!maps) return null;
    return lookupInMaps(maps, keys, type, fallbackToOtherType);
  };

  if (preferFolder) {
    const hit = tryFolder(preferFolder);
    if (hit) return hit;
  }

  for (const folder of Object.keys(manifest.byFolder).sort()) {
    if (folder === preferFolder) continue;
    const hit = tryFolder(folder);
    if (hit) return hit;
  }

  return null;
}

export function getSiteImageOrPlaceholder(
  slug: string,
  type: ImageType = "screenshot",
  preferFolder?: string,
  fallbackToOtherType = true,
): string {
  return (
    getSiteImage(slug, type, fallbackToOtherType, preferFolder) ??
    SITE_IMAGE_PLACEHOLDER
  );
}
