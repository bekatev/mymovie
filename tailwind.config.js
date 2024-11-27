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
          DEFAULT: "#A9B7F5",
        },
        buttonHover: "#8492cf",
        txt: "#26293F",
      },
    },
  },
  plugins: ["flowbite/plugin"],
};
