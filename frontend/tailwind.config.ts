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
        ink:           "#0F0E0C",
        "ink-soft":    "#3A3834",
        cream:         "#F9F6F1",
        "warm-white":  "#FFFDF9",
        sage:          "#6B7F6E",
        "sage-deep":   "#3E5240",
        champagne:     "#C9A96E",
        "champagne-lt":"#E8D5B0",
        blush:         "#D4AFA3",
        charcoal:      "#1C1B19",
        mist:          "#EAE7E1",
      },
    },
  },
  plugins: [],
};
export default config;
