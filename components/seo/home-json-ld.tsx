import { getSiteUrl } from "@/lib/site";
import { listings } from "@/lib/data";

export function HomeJsonLd() {
  const base = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "FansLocked",
    description:
      "High-density discovery directory for adult listings with editorial context and affiliate disclosures.",
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
