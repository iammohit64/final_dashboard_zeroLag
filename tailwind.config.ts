import type { Config } from "tailwindcss"
 
const config = {
  darkMode: ["class"], 
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
        background: '#FFF8E1', // Butter Cream
        primary: {
          DEFAULT: '#FDD365', // Honey Mustard
          hover: '#FBC647',
        },
        secondary: '#FFB6B9', // Blush Pink
        card: '#FFFFFF', // Pure White
        cardshadow: 'rgba(0,0,0,0.08)',
        text: '#2B2C34', // Deep Gray
        subtleText: '#6B6B6B', // Cool Gray
        border: '#E6E6E6', // Soft Gray
        success: '#A0E7A0', // Mint Green
        danger: '#FF6B6B', // Rose Red
        sidebar: '#FFF4D3',
        sidebarDeep: '#FFE8A1',
        avatarBg: '#FFF2D7',
      },
      borderRadius: {
        lg: '16px',
        xl: '24px',
        '3xl': '32px',
        full: '9999px',
        sm: "calc(var(--radius) - 4px)",
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
      fontFamily: {
        headline: ['Poppins', 'Quicksand', 'Nunito', 'sans-serif'],
        body: ['Nunito', 'Quicksand', 'Poppins', 'sans-serif'],
        ui: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config
 
export default config

