import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
          "bg-white": "#FFFFFF",
          sage: "#E7F1EB",
          "sage-dark": "#D2E4D8",
          muted: "#667085",
          border: "#E2DED5",
        },
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "sans-serif"],
        heading: ["var(--font-jakarta)", "sans-serif"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        tablet: "1024px",
        lg: "1024px",
        xl: "1280px",
        desktop: "1440px",
        "2xl": "1536px",
      },
      boxShadow: {
        card: "0 4px 20px -2px rgba(16, 32, 31, 0.06), 0 2px 6px -1px rgba(16, 32, 31, 0.04)",
        "card-hover": "0 20px 30px -10px rgba(7, 84, 63, 0.12), 0 10px 10px -5px rgba(7, 84, 63, 0.04)",
        floating: "0 25px 50px -12px rgba(16, 32, 31, 0.25)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
    },
  },
  plugins: [],
};
export default config;
