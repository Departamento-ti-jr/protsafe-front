import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Nova paleta de cores baseada em marrom #795032
        "modernize-primary": "#795032",
        "modernize-secondary": "#A67C52",
        "modernize-success": "#5D7F3A",
        "modernize-warning": "#D9A566",
        "modernize-error": "#C25E3F",
        "modernize-purple": "#6D4E70",
        "modernize-pink": "#B25D69",
        "modernize-indigo": "#4D5975",
        "modernize-gray": {
          50: "#F9F7F5",
          100: "#F3F0ED",
          200: "#E5E0D9",
          300: "#D1C8BE",
          400: "#B3A89B",
          500: "#8D7D6D",
          600: "#6B5D4E",
          700: "#574B3F",
          800: "#3E352D",
          900: "#2A241E",
        },

        border: "rgb(var(--border))",
        input: "rgb(var(--input))",
        ring: "rgb(var(--ring))",
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        primary: {
          DEFAULT: "#795032",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#A67C52",
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#C25E3F",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#F9F7F5",
          foreground: "#6B5D4E",
        },
        accent: {
          DEFAULT: "#D9A566",
          foreground: "#3E352D",
        },
        popover: {
          DEFAULT: "rgb(var(--popover))",
          foreground: "rgb(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "rgb(var(--card))",
          foreground: "rgb(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "12px",
        md: "8px",
        sm: "6px",
      },
      boxShadow: {
        modernize: "0 0 20px rgba(121, 80, 50, 0.15)",
        "modernize-lg": "0 10px 40px rgba(121, 80, 50, 0.15)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
