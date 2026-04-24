import { FanslockedHomePage } from "@/components/fanslocked-home/fanslocked-home-page";
import { HomeJsonLd } from "@/components/seo/home-json-ld";

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <FanslockedHomePage />
    </>
  );
}
