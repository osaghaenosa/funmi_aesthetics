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
        display:   ["Cormorant Garamond", "Georgia", "Times New Roman", "serif"],
        cormorant: ["Cormorant Garamond", "Georgia", "Times New Roman", "serif"],
        sans:      ["DM Sans", "system-ui", "-apple-system", "sans-serif"],
        mono:      ["DM Mono", "Fira Mono", "monospace"],
      },
      colors: {
        ink:            "#0F0E0C",
        "ink-soft":     "#3A3834",
        cream:          "#F9F6F1",
        "warm-white":   "#FFFDF9",
        sage:           "#6B7F6E",
        "sage-deep":    "#3E5240",
        champagne:      "#C9A96E",
        "champagne-lt": "#E8D5B0",
        blush:          "#D4AFA3",
        charcoal:       "#1C1B19",
        mist:           "#EAE7E1",
        stone:          "#8E8B82",
        gold:           "#C9A96E",
      },
    },
  },
  plugins: [],
};

export default config;
