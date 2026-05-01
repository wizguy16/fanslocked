import type { Listing } from "@/types/listing";

export type UserSnapshotContent = {
  snapshotRows: { label: string; value: string }[];
  feelsLike: string[];
  notIdealFor: string[];
  realityCheck: string[];
};

const TINDER: UserSnapshotContent = {
  snapshotRows: [
    {
      label: "Best For",
      value: "Casual hookups, fast matches, large dating pool",
    },
    {
      label: "Pricing",
      value: "Free with optional premium tiers (Plus, Gold, Platinum)",
    },
    {
      label: "User Base",
      value: "Massive global audience, especially strong in urban areas",
    },
    {
      label: "Ease of Use",
      value: "Very easy — swipe-based interface, fast onboarding",
    },
    {
      label: "Profile Quality",
      value: "Mixed — high volume but varies in effort and intent",
    },
    {
      label: "Safety",
      value:
        "Moderate — includes photo verification, but still requires caution",
    },
  ],
  feelsLike: [
    "Fast-paced, swipe-heavy experience",
    "High match volume, but low depth per interaction",
    "Very competitive in major cities",
    "Designed for quick decisions, not deep filtering",
  ],
  notIdealFor: [
    "Users seeking serious, long-term relationships",
    "People wanting highly curated or niche matches",
    "Users who prefer slower, more intentional dating",
  ],
  realityCheck: [
    "Visibility often depends on activity and profile quality",
    "Premium features significantly increase exposure",
    "Expect inconsistent match quality due to scale",
  ],
};

function genericSnapshot(listing: Listing): UserSnapshotContent {
  const short = listing.description.replace(/\s+/g, " ").trim();
  return {
    snapshotRows: [
      {
        label: "Best For",
        value: `Readers browsing ${listing.categoryLabel.toLowerCase()} listings`,
      },
      {
        label: "Pricing",
        value:
          "Varies by platform — check the official site for current plans and trials",
      },
      {
        label: "User Base",
        value:
          "Depends on region and category; larger brands usually mean more volume",
      },
      {
        label: "Ease of Use",
        value:
          "Most picks emphasize fast signup; expect a learning curve on niche tools",
      },
      {
        label: "Profile Quality",
        value:
          "Mixed — popular networks skew toward volume over depth per profile",
      },
      {
        label: "Safety",
        value:
          "Treat DMs and meetups with normal online-dating caution; verify what verification tools exist",
      },
    ],
    feelsLike: [
      short ? `Overall positioning: ${short.slice(0, 120)}${short.length > 120 ? "…" : ""}` : "Category-typical discovery and messaging patterns",
      "Match and chat volume usually correlates with how active you are",
      "Major metros feel crowded; smaller markets can feel sparse",
      "Free tiers often emphasize speed over fine-grained control",
    ],
    notIdealFor: [
      "Anyone who needs guarantees about chemistry or outcomes",
      "Users who want hand-matched or concierge-style screening",
      "People uncomfortable with public photos or location-based matching",
    ],
    realityCheck: [
      "Algorithms reward recent activity and strong media — plan accordingly",
      "Paid tiers commonly unlock reach, filters, or visibility — read the fine print",
      "Experiences vary widely by city, age band, and intent on the network",
    ],
  };
}

export function getUserSnapshotContent(listing: Listing): UserSnapshotContent {
  if (listing.slug === "tinder") return TINDER;
  return genericSnapshot(listing);
}
