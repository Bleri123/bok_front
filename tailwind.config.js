/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "Arial"],
      },
      colors: {
        primary: "#1F2937",
        secondary: "#E5E7EB",
      },
    },
  },
  plugins: [],
};
