import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        bunker: {
          "50": "#f5f8f8",
          "100": "#dee6e9",
          "200": "#bcced3",
          "300": "#93adb5",
          "400": "#6d8894",
          "500": "#536d79",
          "600": "#405661",
          "700": "#36464f",
          "800": "#2e3b41",
          "900": "#1b2024",
          "950": "#0a0d0f",
        },
      },
    },
  },
  plugins: [
    
  ],
} satisfies Config;
