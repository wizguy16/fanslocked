import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "@/styles/globals.css";
import { ConditionalNavbar } from "@/components/layout/conditional-navbar";
import { ConditionalFooter } from "@/components/layout/conditional-footer";
import { Newsletter } from "@/components/sections/newsletter";
import { AgeGate } from "@/components/age-gate";
import { PlausibleAnalytics } from "@/components/analytics/plausible";
import { getSiteUrl } from "@/lib/site";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "FansLocked — High-density discovery for adult listings",
    template: "%s · FansLocked",
  },
  description:
    "Fast, scannable directory of 750+ listings with clear CTAs, category feeds, and affiliate-safe outbound links.",
  openGraph: {
    title: "FansLocked — Discovery directory",
    description:
      "Dense grids, featured picks per vertical, and one-click visits across tubes, premium, VR, cams, and more.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "FansLocked",
    description:
      "High-density discovery for adult listings with clear CTAs and category feeds.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0A0B10",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${jakarta.variable} ${syne.variable} flex min-h-screen flex-col bg-background font-sans antialiased`}
      >
        <PlausibleAnalytics />
        <AgeGate />
        <ConditionalNavbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Newsletter />
        <ConditionalFooter />
      </body>
    </html>
  );
}
