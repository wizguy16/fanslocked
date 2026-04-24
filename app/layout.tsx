import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
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
    default: "The Porn Dude 2.0 — Best adult sites ranked (2026)",
    template: "%s · The Porn Dude 2.0",
  },
  description:
    "Luxury dark-mode directory of 750+ adult websites: editorial star ratings, pros & cons, and transparent affiliate links across 30+ categories.",
  openGraph: {
    title: "The Porn Dude 2.0 — Adult link directory (2026)",
    description:
      "Editor-tested rankings, glassmorphism UI, and high-intent CTAs across tubes, premium, VR, cams, and niches.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Porn Dude 2.0",
    description:
      "Curated adult website directory with reviews and affiliate disclosures.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
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
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
