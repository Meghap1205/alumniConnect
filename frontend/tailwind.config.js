const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        grype: ['Grype', 'sans-serif'],
      },
      colors: {
        'custom-blue-dark': '#3f83f8',
        'custom-blue-light': '#e4f2ff', // Replace with your desired hex value
      }
    },
  },

  plugins: [flowbite.plugin(),],
};