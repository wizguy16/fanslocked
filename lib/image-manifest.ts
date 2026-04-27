import manifestJson from "./generated/site-images-manifest.json";

export type ImageType = "screenshot" | "logo";

export type FolderImageMaps = {
  screenshot: Record<string, string>;
  logo: Record<string, string>;
};

export type SitesImageManifest = {
  byFolder: Record<string, FolderImageMaps>;
};

let cachedManifest: SitesImageManifest | null = null;

export function getSitesImageManifest(): SitesImageManifest {
  if (!cachedManifest) cachedManifest = manifestJson as SitesImageManifest;
  return cachedManifest;
}
