import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05070c",
        foreground: "#e2e8f0",
        card: {
          DEFAULT: "rgba(255,255,255,0.03)",
          border: "rgba(255,255,255,0.10)",
        },
        accent: {
          blue: "#6ea8ff",
          emerald: "#34d399",
        },
      },
      boxShadow: {
        glow: "0 0 60px -20px rgba(86, 140, 255, 0.45)",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
