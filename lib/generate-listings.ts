import type { Listing } from "@/types/listing";
import { CATEGORIES } from "@/lib/categories";
import { buildListingOutboundPath } from "@/lib/affiliate-url";
import { buildCuratedFreeTubeListings } from "@/lib/curated-free-tubes";
import { buildCuratedPremiumPornListings } from "@/lib/curated-premium-porn";
import { buildCuratedLiveCamsListings } from "@/lib/curated-live-cams";
import { buildCuratedVRPornListings } from "@/lib/curated-vr-porn";
import { buildCuratedAIGeneratedListings } from "@/lib/curated-ai-generated";
import { buildCuratedFanSubscriptionPlatformListings } from "@/lib/curated-fan-subscription-platforms";
import { buildCuratedMaleCompanionsListings } from "@/lib/curated-male-companions";
import { buildCuratedHookupListings } from "@/lib/curated-hookup";
import { buildCuratedSexChatListings } from "@/lib/curated-sexchat";
import { buildCuratedSearchListings } from "@/lib/curated-search";
import { buildCuratedAmateurListings } from "@/lib/curated-amateur";
import { buildCuratedGamingListings } from "@/lib/curated-gaming";
import { buildCuratedHentaiListings } from "@/lib/curated-hentai";
import { buildCuratedFetishBdsmListings } from "@/lib/curated-fetish-bdsm";

const LISTINGS_PER_CATEGORY = 25;

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const PREFIX = [
  "Nova",
  "Velvet",
  "Pulse",
  "Arc",
  "Lumen",
  "Cipher",
  "Atlas",
  "Echo",
  "Jet",
  "Silver",
  "Crown",
  "Harbor",
  "Zenith",
  "Rapid",
  "Quartz",
  "Drift",
  "Pixel",
  "North",
  "Mint",
  "Blaze",
  "Signal",
  "Orbit",
  "Stream",
  "Violet",
  "Crimson",
  "Onyx",
  "Solar",
  "Lunar",
  "Amber",
  "Obsidian",
  "Neon",
  "Glacier",
  "Ember",
  "Halo",
  "Nimbus",
  "Prism",
  "Vanta",
  "Kinetic",
  "Apex",
];

const MID = [
  "Ring",
  "Wave",
  "Vault",
  "Grid",
  "Line",
  "Cast",
  "Stack",
  "Pass",
  "Hub",
  "Lane",
  "Field",
  "Gate",
  "Port",
  "Bay",
  "Peak",
  "Rift",
  "Flow",
  "Core",
  "Edge",
  "Link",
  "Nest",
  "Deck",
  "Run",
  "Loop",
  "Shift",
];

const SUFFIX = [
  "Labs",
  "Media",
  "Network",
  "Studios",
  "Digital",
  "Stream",
  "Live",
  "Plus",
  "Pro",
  "HQ",
  "Club",
  "House",
  "Works",
  "Forge",
  "Prime",
  "World",
  "Zone",
  "X",
  "Now",
  "One",
  "Direct",
  "Play",
  "View",
  "Cast",
  "TV",
];

const PROS_POOL = [
  "Fast global CDN playback",
  "Clean billing and cancellation flows",
  "Strong mobile web experience",
  "Useful filters and saved searches",
  "Regular catalog updates",
  "Transparent affiliate disclosures on-site",
  "Helpful onboarding and tooltips",
  "Multiple bitrate ladders for slower networks",
  "Optional downloads where licensing allows",
  "Respectful metadata and performer credits",
  "Dark mode UI that is easy on the eyes",
  "Helpful support docs and FAQs",
  "Stable player with keyboard shortcuts",
  "Clear age-gate and regional notices",
  "Community features without noisy spam",
];

const CONS_POOL = [
  "Premium tiers can be pricey month-to-month",
  "Upsell modals appear on free tiers",
  "Some regions require VPN for full libraries",
  "Trial windows are shorter than competitors",
  "Occasional aggressive ad placements on free plans",
  "Search relevance can be hit-or-miss for niche tags",
  "Account creation required for HD on some plans",
  "Limited subtitle languages on older scenes",
  "Download rights vary by studio bundle",
  "Support response times spike on weekends",
];

const PHOTOS = [
  "photo-1611162617474-5b21e879e113",
  "photo-1522071820081-009f0129c71c",
  "photo-1556761175-5973dc0f32e7",
  "photo-1516321318423-f06f85e504b3",
  "photo-1600880292203-757bb62b4baf",
  "photo-1556761175-b413da4baf72",
  "photo-1553877522-43269d4ea984",
  "photo-1542744173-8e7e53415bb0",
  "photo-1557804506-669a67965ba0",
  "photo-1492684223066-81342ee5ff30",
  "photo-1460925895917-afdab827c52f",
  "photo-1551434678-e076c223a692",
  "photo-1517245386807-bb43f82c33c4",
  "photo-1522202176988-66273c2fd55f",
  "photo-1556761175-4b46a572b786",
  "photo-1504384308090-c894fdcc538d",
  "photo-1521737711867-e3b97375f902",
  "photo-1554224155-6726b3ff858f",
  "photo-1511578314322-379afb476865",
  "photo-1555949963-aa79dcee981c",
  "photo-1551288049-bebda4e38f71",
  "photo-1521737604893-d14cc237f11d",
  "photo-1493225457124-a3eb161ffa5f",
  "photo-1550745165-9bc0b252726f",
  "photo-1507591064344-4c6ce005b128",
  "photo-1508214751196-bcfd4ca60fea",
  "photo-1463453091185-6628200d7e7e",
  "photo-1492562080023-ab3db95bfbce",
  "photo-1519345182560-3f2917c472ef",
  "photo-1506794778202-cad84cf45f1d",
  "photo-1521572267360-ee0c2909d518",
  "photo-1527980965255-d3b416303d12",
  "photo-1570295999919-56ceb9ecca71",
  "photo-1502823403499-6ccfcf4fb453",
  "photo-1521572267360-ee0c2909d518",
  "photo-1494790108377-be9c29b29330",
  "photo-1507003211169-0a1dd7228f2d",
  "photo-1534528741775-53994a69daeb",
  "photo-1500648767791-00dcc994a43e",
  "photo-1472099645785-5658abf4ff4e",
];

function imageFor(seed: number) {
  const id = PHOTOS[seed % PHOTOS.length];
  return `https://images.unsplash.com/${id}?w=900&q=82&fit=crop`;
}

function logoFor(seed: number) {
  const id = PHOTOS[(seed * 7) % PHOTOS.length];
  return `https://images.unsplash.com/${id}?w=160&q=80&fit=crop`;
}

function websiteUrl(slug: string) {
  return `https://www.${slug.replace(/[^a-z0-9-]/gi, "")}.example`;
}

function pickUnique<T>(rand: () => number, pool: T[], count: number): T[] {
  const copy = [...pool];
  const out: T[] = [];
  while (out.length < count && copy.length > 0) {
    const i = Math.floor(rand() * copy.length);
    out.push(copy.splice(i, 1)[0]!);
  }
  return out;
}

function buildReview(
  name: string,
  categoryLabel: string,
  rand: () => number,
): string {
  const toneA = [
    `${name} consistently delivered stable playback during our multi-session evaluation window.`,
    `Our editors stress-tested ${name} across desktop and mobile Safari/Chrome with no major player regressions.`,
    `Within the ${categoryLabel} cohort, ${name} stood out for predictable navigation and clear pricing cues.`,
  ];
  const toneB = [
    `Discovery filters felt modern, and results updated quickly as we refined keyword combinations.`,
    `We appreciated transparent disclosures around third-party billing and cancellation paths.`,
    `Catalog freshness was above average for this niche, with weekly or bi-weekly update cadences.`,
  ];
  const toneC = [
    `As with any adult destination, verify age requirements and local regulations before subscribing.`,
    `We still recommend comparing trial terms against two close competitors before committing long-term.`,
    `Overall, ${name} earns a confident recommendation for readers prioritizing polish and uptime.`,
  ];
  const pick = (arr: string[]) => arr[Math.floor(rand() * arr.length)]!;
  return `${pick(toneA)} ${pick(toneB)} ${pick(toneC)}`;
}

function tagsFor(rand: () => number, categorySlug: string): string[] {
  const base = ["hd", "streaming", "verified", "editor-pick", "ai"];
  const extras: Record<string, string[]> = {
    "free-tube": ["free", "trending", "ads"],
    "premium-porn": ["premium", "4k", "exclusive"],
    "live-cams": ["live", "tokens", "interactive"],
    vr: ["vr", "immersive", "headset"],
    hookup: ["dating", "hookup", "matches", "local"],
    "hentai-anime": ["hentai", "anime", "manga", "subbed"],
    gaming: ["gaming", "browser", "adult", "interactive"],
    "fetish-bdsm": ["fetish", "bdsm", "kink", "niche"],
    "ai-generated": ["ai", "generator", "companion", "recurring"],
    "fan-subscription-platforms": ["creator", "subscriptions", "fan-platform", "revshare"],
    "male-companions": ["male", "companions", "lgbt"],
    "sex-chat": ["sexting", "chat", "credits", "private"],
    search: ["search", "directory", "discovery", "tube"],
    amateur: ["amateur", "creator", "homemade", "clips"],
  };
  const extra = extras[categorySlug] ?? ["niche", "curated", "new"];
  const pool = [...base, ...extra, "trending", "premium", "new", "free"];
  return pickUnique(rand, pool, 5);
}

function addedDate(seed: number): string {
  const start = new Date("2025-06-01").getTime();
  const day = seed % 300;
  const d = new Date(start + day * 86400000);
  return d.toISOString().slice(0, 10);
}

export function generateAllListings(): Listing[] {
  const out: Listing[] = [];
  let global = 0;
  for (const cat of CATEGORIES) {
    if (cat.slug === "ai-generated") {
      const curated = buildCuratedAIGeneratedListings(cat);
      out.push(...curated);
      global += curated.length;
      continue;
    }
    if (cat.slug === "free-tube") {
      const curated = buildCuratedFreeTubeListings(cat);
      out.push(...curated);
      global += curated.length;
      continue;
    }
    if (cat.slug === "search") {
      const curated = buildCuratedSearchListings(cat);
      out.push(...curated);
      global += curated.length;
      continue;
    }
    if (cat.slug === "premium-porn") {
      const curated = buildCuratedPremiumPornListings(cat);
      out.push(...curated);
      global += curated.length;
      continue;
    }
    if (cat.slug === "live-cams") {
      const curated = buildCuratedLiveCamsListings(cat);
      out.push(...curated);
      global += curated.length;
      continue;
    }
    if (cat.slug === "fan-subscription-platforms") {
      const curated = buildCuratedFanSubscriptionPlatformListings(cat);
      out.push(...curated);
      global += curated.length;
      continue;
    }
    if (cat.slug === "amateur") {
      const curated = buildCuratedAmateurListings(cat);
      out.push(...curated);
      global += curated.length;
      continue;
    }
    if (cat.slug === "vr") {
      const curated = buildCuratedVRPornListings(cat);
      out.push(...curated);
      global += curated.length;
      continue;
    }
    if (cat.slug === "male-companions") {
      const curated = buildCuratedMaleCompanionsListings(cat);
      out.push(...curated);
      global += curated.length;
      continue;
    }
    if (cat.slug === "hookup") {
      const curated = buildCuratedHookupListings(cat);
      out.push(...curated);
      global += curated.length;
      continue;
    }
    if (cat.slug === "sex-chat") {
      const curated = buildCuratedSexChatListings(cat);
      out.push(...curated);
      global += curated.length;
      continue;
    }
    if (cat.slug === "gaming") {
      const curated = buildCuratedGamingListings(cat);
      out.push(...curated);
      global += curated.length;
      continue;
    }
    if (cat.slug === "hentai-anime") {
      const curated = buildCuratedHentaiListings(cat);
      out.push(...curated);
      global += curated.length;
      continue;
    }
    if (cat.slug === "fetish-bdsm") {
      const curated = buildCuratedFetishBdsmListings(cat);
      out.push(...curated);
      global += curated.length;
      continue;
    }
    for (let i = 0; i < LISTINGS_PER_CATEGORY; i++) {
      global += 1;
      const seed = global * 977 + i * 131 + cat.slug.length * 17;
      const rand = mulberry32(seed);
      const slug = `${cat.slug}-${String(i + 1).padStart(2, "0")}`;
      const name = `${PREFIX[Math.floor(rand() * PREFIX.length)]}${MID[Math.floor(rand() * MID.length)]}${SUFFIX[Math.floor(rand() * SUFFIX.length)]}`;
      const rating = Math.round((3.6 + rand() * 1.35) * 10) / 10;
      const popularity_score = Math.round(40 + rand() * 58);
      const description = `Editor-tested ${cat.label.toLowerCase()} pick with strong UX, fair monetization, and reliable playback.`;
      const review = buildReview(name, cat.label, rand);
      const pros = pickUnique(rand, PROS_POOL, 3);
      const cons = pickUnique(rand, CONS_POOL, 3);
      const tags = tagsFor(rand, cat.slug);
      out.push({
        id: `listing-${global}`,
        name,
        slug,
        categorySlug: cat.slug,
        categoryLabel: cat.label,
        tags,
        description,
        review,
        pros,
        cons,
        image: imageFor(seed),
        logo: logoFor(seed + 3),
        affiliate_url: buildListingOutboundPath(slug),
        website_url: websiteUrl(slug),
        rating,
        added_date: addedDate(seed),
        popularity_score,
      });
    }
  }
  return out;
}
