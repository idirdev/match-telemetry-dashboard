import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neon: { green: "#00ff88", blue: "#00d4ff", purple: "#b347ff", red: "#ff3366", yellow: "#ffcc00" },
        surface: { 900: "#0a0e17", 800: "#111827", 700: "#1a2332", 600: "#243044" },
      },
      fontFamily: { mono: ["JetBrains Mono", "Fira Code", "monospace"] },
    },
  },
  plugins: [],
};
export default config;
