import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

export default function FetishCategoryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className={manrope.className}>{children}</div>;
}
