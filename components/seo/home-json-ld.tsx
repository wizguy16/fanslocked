import { getSiteUrl } from "@/lib/site";
import { listings } from "@/lib/data";

export function HomeJsonLd() {
  const base = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Porn Dude 2.0",
    description:
      "Curated adult website directory with editorial reviews and affiliate disclosures.",
    url: base,
    about: {
      "@type": "Thing",
      name: "Adult website reviews",
      description: `${listings.length}+ listings across premium, tubes, VR, cams, and niche verticals.`,
    },
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
