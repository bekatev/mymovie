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
          DEFAULT: "#f3d503",
        },
        buttonHover: "#f7e24f",
      },
    },
  },
  plugins: ["flowbite/plugin"],
};
