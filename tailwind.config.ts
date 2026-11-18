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
        sans: ['"Hind Siliguri"', "Inter", "sans-serif"],
        serif: ['"Noto Serif Bengali"', '"Cormorant Garamond"', "Georgia", "serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        canvas: "var(--bg-canvas)",
        surface: "var(--bg-surface)",
        elevated: "var(--bg-elevated)",
        ink: "var(--text-primary)",
        muted: "var(--text-muted)",
        subtle: "var(--border-subtle)",
        accent: "var(--accent-primary)",
        accentHover: "var(--accent-hover)",
        gold: "#c9a27c",
      },
    },
  },
  plugins: [],
};

export default config;
