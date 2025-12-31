/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        skyblue: "#00D9FF",
        skyblue600: "#00b8e0",
        muted: "#8892A6",
        panel: "#071021",
        glow: "#7BE0FF",
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 6px 30px rgba(0, 217, 255, 0.12)",
      },
    },
  },
  plugins: [],
};
