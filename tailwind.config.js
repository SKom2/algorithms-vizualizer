import colors from "./src/data/colors.ts";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: colors,
      fontFamily: {
        'sans-source': ["SansSource", 'sans-serif'],
      },
    },
  },
  plugins: [],
}

