import type { Listing } from "@/types/listing";

export type CategoryBlog = {
  title: string;
  description: string;
  intro: string;
  sections: { title: string; body: string }[];
};

export function generateCategoryBlog(
  categoryName: string,
  listings: Listing[],
): CategoryBlog {
  const lower = categoryName.toLowerCase();
  const pool = listings.length;

  return {
    title: `Best ${categoryName} (2026) — Top Picks & Full Guide`,

    description: `Explore the best ${lower} with verified platforms, strong content libraries, and reliable user experiences.`,

    intro:
      pool > 0
        ? `Finding quality ${lower} platforms can be overwhelming. We drew from ${pool} ranked destination${pool === 1 ? "" : "s"} in our directory to spotlight the strongest picks for consistency, content depth, and overall experience.`
        : `Finding quality ${lower} platforms can be overwhelming. This guide highlights the top options based on consistency, content depth, and overall experience.`,

    sections: [
      {
        title: "Top platforms worth your time",
        body: `We analyzed multiple platforms and selected the most reliable options for ${lower} based on usability, content quality, and reputation.`,
      },
      {
        title: "Free vs premium platforms",
        body: `Free platforms provide accessibility, while premium options typically deliver higher-quality content, better organization, and fewer interruptions.`,
      },
      {
        title: "What to look for",
        body: `Focus on platforms with consistent updates, strong filtering systems, and a clear structure that makes content easy to explore.`,
      },
    ],
  };
}
