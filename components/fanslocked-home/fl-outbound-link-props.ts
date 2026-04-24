import type { Listing } from "@/types/listing";

export function outboundLinkProps(listing: Listing) {
  const href = listing.affiliate_url;
  const internal = href.startsWith("/");
  return {
    href,
    ...(internal
      ? { rel: "sponsored noreferrer" as const }
      : { target: "_blank" as const, rel: "sponsored noopener noreferrer" as const }),
  };
}
