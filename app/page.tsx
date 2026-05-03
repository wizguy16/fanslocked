import { Suspense } from "react";
import { FanslockedHomePage } from "@/components/fanslocked-home/fanslocked-home-page";
import { HomeJsonLd } from "@/components/seo/home-json-ld";

export default function Home() {
  return (
    <>
      <HomeJsonLd />
      <Suspense
        fallback={
          <div
            className="min-h-[100dvh] bg-[#1A1A1A]"
            aria-hidden
          />
        }
      >
        <FanslockedHomePage />
      </Suspense>
    </>
  );
}
