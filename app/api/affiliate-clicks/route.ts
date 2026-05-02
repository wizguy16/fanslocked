import { NextResponse } from "next/server";
import { listings } from "@/lib/data";
import { computeAffiliateSmartScore } from "@/lib/affiliate-smart-score";

export const dynamic = "force-dynamic";

export function GET() {
  const ranked = [...listings]
    .map((listing) => ({
      listing,
      score: computeAffiliateSmartScore(listing.slug),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map((row) => row.listing);

  return NextResponse.json({ listings: ranked });
}
