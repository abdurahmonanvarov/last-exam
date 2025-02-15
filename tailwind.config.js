/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7C5DFA",
        secondary: "#9277FF",
        darkBlue: "#1E2139",
        darkGrayBlue: "#252945",
        lightBlue: "#DFE3FA",
        grayBlue: "#888EB0",
        softPurple: "#7E88C3",
        deepBlack: "#0C0E16",
        red: "#EC5757",
        softRed: "#FF9797",
        lightBG: "#F8F8FB",
        deepGray: "#141625",
      },
    },
  },

  plugins: [daisyui],
};
