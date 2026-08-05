import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx,md}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f7f8f6",
        surface: {
          DEFAULT: "#ffffff",
          soft: "#f0f3f2",
          tint: "#e9f8fb",
        },
        ink: {
          DEFAULT: "#0b1f33",
          soft: "#33485b",
        },
        muted: "#687987",
        line: {
          DEFAULT: "#d9e0e3",
          strong: "#b9c6cc",
        },
        navy: {
          DEFAULT: "#0a2742",
          deep: "#071b2d",
        },
        cyan: {
          DEFAULT: "#12c6df",
          deep: "#069bb4",
          soft: "#dff7fb",
        },
        success: "#166b55",
        warning: "#9a6415",
        danger: "#9d3c3c",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Manrope", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
