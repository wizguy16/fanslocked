import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui"],
        mono: ["ui-monospace", "monospace"],
      },
      colors: {
        background: "#1A1A1A",
        foreground: "#f8fafc",
        card: {
          DEFAULT: "#292929",
          alt: "#242424",
          hover: "rgba(255,255,255,0.05)",
        },
        primary: {
          DEFAULT: "#C90009",
          foreground: "#ffffff",
        },
        highlight: "#FF7A00",
        secondary: "#7C5CFF",
        accent: "#7C5CFF",
      },
      borderRadius: {
        DEFAULT: "1rem",
      },
      boxShadow: {
        soft: "0 8px 30px -12px rgba(0, 0, 0, 0.75)",
        "soft-glow":
          "0 0 36px -10px rgba(201, 0, 9, 0.35), 0 0 60px -24px rgba(124, 92, 255, 0.12)",
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      keyframes: {
        homeIntentFade: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "home-intent-fade": "homeIntentFade 0.3s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
