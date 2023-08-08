/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        lato: ["lato", "sans-serif"],
      },
      textColors: {
        primary: "#3490dc",
        secondary: "#ffed4a",
        danger: "#e3342f",
        lightGray: "#aaa",
      },
    },
  },
  plugins: [],
};
