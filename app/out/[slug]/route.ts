import { NextResponse } from "next/server";
import { getListingBySlug } from "@/lib/data";
import { resolveAffiliateDestination } from "@/lib/get-affiliate-link";
import { recordOutboundClick } from "@/lib/click-tracking";

export function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const listing = getListingBySlug(params.slug);
  if (!listing?.website_url) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  recordOutboundClick(params.slug);

  const cookieHeader = request.headers.get("cookie");
  const dest =
    resolveAffiliateDestination(params.slug, cookieHeader)?.trim() ||
    listing.website_url.trim();
  if (!dest) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.redirect(dest, 302);
}
