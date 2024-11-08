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
        blue: "#0000EE",
        stroke: "#D1D5DB",
        tprimary: "#E5E7EB",
        balancebg: "#7D92AD",
        balancebg2: "#344966",
        green: "#84cc16",
        drawmodal: "#344966",
        bttclick: "#0f766e",
        depositmdd: "#D9D9D9",
      },
    },
  },
  plugins: [],
};
