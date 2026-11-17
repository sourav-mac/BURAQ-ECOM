import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: { sans: ["var(--font-jakarta)", "sans-serif"] },
      colors: {
        buraq: {
          bg: "#FFFDEB", // 60% Dominant Background
          surface: "#FFFFFF", // Slightly elevated card background
          content: "#10201F", // 30% Content & Body text
          important: "#07543F", // 10% Highlight & Accent
          "important-hover": "#053E2E",
          border: "#E2DED5",
          muted: "#667085",
        },
      },
    },
  },
  plugins: [],
};

export default config;
