import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        "3/4": "3 / 4",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
      },
      colors: {
        primary: {
          gold: "#D4AF88",
          cream: "#F5F0E8",
        },
        accent: {
          burgundy: "#8B4F6F",
          sage: "#A8B5A2",
        },
        neutral: {
          bg: "#FAF7F2",
          "text-dark": "#3A2F2F",
          "text-light": "#6B5E5E",
        },
      },
    },
  },
  plugins: [],
};

export default config;
