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
          "100": "#dde7ea",
          "200": "#bccdd3",
          "300": "#92adb6",
          "400": "#6b8996",
          "500": "#516d7b",
          "600": "#3f5662",
          "700": "#354750",
          "800": "#2e3a41",
          "900": "#293338",
          "950": "#12181c",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
