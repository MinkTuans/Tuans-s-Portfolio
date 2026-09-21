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
        nature: {
          forest: "#1F4D32",
          deep: "#163B28",
          sage: "#A8C9AD",
          moss: "#6F9F72",
          cream: "#F7F6EC",
          sky: "#CFE8F5",
          sun: "#F3C77A",
          amber: "#d97706",
          dark: "#0e2419",
        },
        meadow: {
          50: "#f4f8f4",
          100: "#e5f0e6",
          200: "#cce2cd",
          300: "#a5cfa8",
          400: "#74b379",
          500: "#4f9556",
          600: "#3d7843",
          700: "#326038",
          800: "#2a4c2e",
          900: "#244028",
          950: "#102313",
        },
        sky: {
          morning: "#f0f8ff",
          soft: "#e0f2fe",
          breeze: "#bae6fd",
        },
        sun: {
          warm: "#f59e0b",
          amber: "#d97706",
          light: "#fef3c7",
          glow: "#fffbeb",
        },
        olive: {
          50: "#f7fee7",
          500: "#84cc16",
          700: "#4d7c0f",
          900: "#365314",
        },
        earth: {
          sand: "#e7dec8",
          warm: "#854d0e",
          soil: "#451a03",
          stone: "#1c1917",
        },
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
        sans: ["var(--font-inter)", "Plus Jakarta Sans", "Be Vietnam Pro", "system-ui", "-apple-system", "sans-serif"],
        display: ["Plus Jakarta Sans", "Playfair Display", "Be Vietnam Pro", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "drift-slow": "drift 18s ease-in-out infinite alternate",
        "sway-grass": "sway 4s ease-in-out infinite alternate",
        "sun-pulse": "sunPulse 6s ease-in-out infinite",
        "float-slow": "floatSlow 8s ease-in-out infinite",
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
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
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
