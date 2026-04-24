import { HomePageClient } from "@/components/home/home-page-client";
import { CategoryGrid } from "@/components/sections/category-grid";
import { HomeJsonLd } from "@/components/seo/home-json-ld";

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <HomePageClient categoryGrid={<CategoryGrid />} />
    </>
  );
}
