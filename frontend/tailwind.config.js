/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Add this line
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#ec4899",
          "secondary": "#f43f5e",
          "accent": "#f59e0b",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
        dark: {
          "primary": "#ec4899",
          "secondary": "#f43f5e",
          "accent": "#f59e0b",
          "neutral": "#191d24",
          "base-100": "#1f2937",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      }
    ],
  },
};