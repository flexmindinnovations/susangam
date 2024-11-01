import { nextui } from "@nextui-org/theme";

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"]
      },
      colors: {
        ch: {
          50: "#f6f7f9",
          100: "#eceef2",
          200: "#d4d8e3",
          300: "#afb6ca",
          400: "#8490ac",
          500: "#647193",
          600: "#505a79",
          700: "#414963",
          800: "#393f53",
          900: "#333847",
          950: "#272a37"
        }
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        marquee: 'marquee 15ms linear infinite',
      },
    }
  },
  darkMode: "class",
  plugins: [nextui()]
};
