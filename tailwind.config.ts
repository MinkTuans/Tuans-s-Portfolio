import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        steppe: {
          950: "#060a08",
          900: "#0a130e",
          850: "#0f1c15",
          800: "#14251c",
          700: "#1e372b",
          600: "#2d4e3d",
          500: "#457059",
          400: "#69987d",
          300: "#98bfa9",
          200: "#c7ded2",
          100: "#e6f0ea",
          50: "#f3f8f5",
        },
        amber: {
          sun: "#c89a3c",
          warm: "#e5b452",
          glow: "rgba(200, 154, 60, 0.15)",
        },
        earth: {
          sand: "#b89e78",
          bark: "#4a3b2c",
          soil: "#251d16",
        },
        tech: {
          emerald: "#10b981",
          mint: "#34d399",
          glow: "rgba(16, 185, 129, 0.15)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-cinzel)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-gentle": "floatGentle 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s ease-in-out infinite",
      },
      keyframes: {
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
