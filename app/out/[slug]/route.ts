import { NextResponse } from "next/server";
import { getListingBySlug } from "@/lib/data";

export function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  const listing = getListingBySlug(params.slug);
  if (!listing?.website_url) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.redirect(listing.website_url, 302);
}
