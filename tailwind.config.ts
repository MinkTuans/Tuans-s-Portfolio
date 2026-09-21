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
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-cinzel)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "drift-slow": "drift 18s ease-in-out infinite alternate",
        "sway-grass": "sway 4s ease-in-out infinite alternate",
        "sun-pulse": "sunPulse 6s ease-in-out infinite",
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
      },
    },
  },
  plugins: [],
};

export default config;
