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
        forest: {
          50: "#f2f7f3",
          100: "#e0ede2",
          200: "#c4ddc8",
          300: "#9dc4a4",
          400: "#6fa679",
          500: "#498954",
          600: "#366e40",
          700: "#2c5734",
          800: "#25462c",
          900: "#18321e",
          950: "#0b1a12",
        },
        twilight: {
          900: "#09171c",
          950: "#040d10",
        },
        moss: {
          light: "#dcedc8",
          DEFAULT: "#689f38",
          dark: "#33691e",
        },
        bark: {
          light: "#d7ccc8",
          DEFAULT: "#795548",
          dark: "#3e2723",
        },
        gold: {
          glow: "#ffecb3",
          sun: "#f59e0b",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        hand: ["var(--font-hand)", "cursive", "sans-serif"],
        display: ["var(--font-hand)", "Georgia", "serif"],
      },
      animation: {
        "drift-slow": "drift 18s ease-in-out infinite alternate",
        "sway-grass": "sway 4s ease-in-out infinite alternate",
        "sun-pulse": "sunPulse 6s ease-in-out infinite",
        "float-leaf": "floatLeaf 10s ease-in-out infinite",
        "fog-flow": "fogFlow 25s linear infinite",
      },
      keyframes: {
        drift: {
          "0%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(25px)" },
        },
        sway: {
          "0%": { transform: "rotate(-1.5deg)" },
          "100%": { transform: "rotate(1.5deg)" },
        },
        sunPulse: {
          "0%, 100%": { opacity: "0.85", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        floatLeaf: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "0" },
          "15%": { opacity: "0.8" },
          "85%": { opacity: "0.8" },
          "100%": { transform: "translateY(120vh) rotate(360deg)", opacity: "0" },
        },
        fogFlow: {
          "0%": { transform: "translateX(-20%)" },
          "100%": { transform: "translateX(20%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
