/**
 * When listing `slug` ≠ image basename(s), the resolver tries each string in order
 * (then the raw slug and its de-hyphenated form) against the manifest keys.
 */
export const SITE_IMAGE_SLUG_ALIASES: Record<string, string[]> = {
  rentmen: ["rentm"],
  justforfans: ["justforfansamateur"],
  "reality-kings": ["realityking"],
  manyvids: ["manyvids", "mv"],
  clips4sale: ["clips4sale", "c4s"],
  virtualrealporn: ["virtualreal"],
  badoinkvr: ["badionk"],
  "virtual-taboo": ["taboo"],
  wankzvr: ["wankz"],
  "naughty-america-vr": ["naughtyamerica"],
  rentmasseur: ["rentrubber"],
  masseurfinder: ["mfinder"],
  /** Search category uses suffixed slugs; PNGs use tube basename under `searchEngine/`. */
  "spankbang-search": ["spankbang"],
  "xnxx-search": ["xnxx"],
  "xvideos-search": ["xvideos"],
  "youporn-search": ["youporn"],
  /** Listing slug `juicychat` → asset named from `juicychat-ai` (de-hyphened stem). */
  juicychat: ["juicychatai"],
  "candybox-ai": ["candyai"],
  /** Asset basename typos under `public/images/sites/sexchat/`. */
  chatrecruit: ["chatrecuit"],
  arousr: ["arouser"],
  sextpanther: ["sexphanter"],
};
