/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#a65e46",
        },
        buttonHover: "#8f4c36",
        txt: "#ffffff",
      },
    },
  },
  plugins: ["flowbite/plugin"],
};
