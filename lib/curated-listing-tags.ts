/**
 * Short display tags for curated listings (max two words, no scores).
 * Keys are `categorySlug::listingSlug` so the same slug can differ by vertical.
 */

const KEY_TAGS: Record<string, string> = {
  "premium-porn::pornbox": "Marketplace",
  "premium-porn::adulttime": "Network",
  "premium-porn::evil-angel": "Niche",
  "premium-porn::deeper": "Studio",
  "fan-subscription-platforms::manyvids": "Marketplace",
  "fan-subscription-platforms::fanvue": "AI tools",
  "amateur::manyvids": "Marketplace",
  "amateur::fansly": "Creator",
  "amateur::fancentro": "Creator",
  "amateur::loyalfans": "Independent",
  "amateur::clips4sale": "Clips",
  "amateur::iwantclips": "Clips",
  "amateur::pocketstars": "Community",
  "amateur::apclips": "Clips",
  "amateur::justforfans": "Independent",
  "amateur::admireme": "Independent",
  "amateur::ismygirl": "Creator",
  "hookup::ashley-madison": "Niche",
  "hookup::secretbenefits": "Niche",
  "hookup::snapsext": "Community",
  "live-cams::skyprivate": "Premium",
  "live-cams::luckycrush": "Random chat",
  "live-cams::coomeet": "Random chat",
  "live-cams::streamate": "Studio",
  "live-cams::livejasmin": "Studio",
  "vr::vrcosplayx": "Niche VR",
  "vr::kinkvr": "Niche VR",
  "vr::groobyvr": "Niche VR",
  "sex-chat::niteflirt": "Premium",
  "sex-chat::premiumchat": "Premium",
  "sex-chat::jerkmate": "Live + chat",
  "search::tubesafari": "Discovery",
  "search::pornmd": "Discovery",
  "gaming::nutaku": "Studio",
  "gaming::itch-adult": "Marketplace",
  "gaming::grand-bang-auto": "Game",
  "gaming::gamelink-interactive": "Premium",
  "gaming::hentaiheroes": "RPG",
  "ai-generated::spicychat": "Community",
  "ai-generated::crushon-ai": "Community",
  "fetish-bdsm::kink": "Studio",
  "fetish-bdsm::clips4sale-fetish": "Clips",
  "male-companions::rentmen": "Directory",
  "escort-directories::massage-republic": "Directory",
  "escort-directories::slixa": "Premium",
};

const DEFAULT_TAG: Record<string, string> = {
  "free-tube": "Community",
  "premium-porn": "Studio",
  "live-cams": "Tokens",
  "vr": "VR",
  "sex-chat": "Community",
  "hookup": "Community",
  "hentai-anime": "Niche",
  "fetish-bdsm": "Niche",
  amateur: "Independent",
  "fan-subscription-platforms": "Premium",
  search: "Discovery",
  gaming: "Premium",
  "ai-generated": "AI",
  "male-companions": "Directory",
  "escort-directories": "Directory",
};

export function curatedListingTag(categorySlug: string, listingSlug: string): string {
  const key = `${categorySlug}::${listingSlug}`;
  if (KEY_TAGS[key]) return KEY_TAGS[key];

  if (categorySlug === "live-cams") {
    if (listingSlug.includes("private")) return "Premium";
    if (listingSlug === "myfreecams" || listingSlug === "cam4")
      return "Freemium";
  }

  if (categorySlug === "gaming") {
    if (listingSlug.includes("itch")) return "Marketplace";
    if (listingSlug === "gamejolt-adult") return "Community";
  }

  return DEFAULT_TAG[categorySlug] ?? "Premium";
}
