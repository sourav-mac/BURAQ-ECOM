import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-jakarta)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      colors: {
        buraq: {
          primary: "#07543F",
          "primary-hover": "#053E2E",
          "primary-light": "#0A7255",
          dark: "#10201F",
          "dark-soft": "#162C2A",
          accent: "#D96B1F",
          "accent-hover": "#BE5A16",
          "accent-light": "#FDEEE5",
          bg: "#FFFDEB",
          "bg-alt": "#FAF8E4",
          surface: "#FFFFFF",
          sage: "#E7F1EB",
          "sage-dark": "#D2E4D8",
          muted: "#667085",
          border: "#E2DED5",
        },
      },
    },
  },
  plugins: [],
};

export default config;
