const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        grype: ["Grype", "sans-serif"],
      },
      colors: {
        "custom-blue": "#0694A2",
      },
    },
  },

  plugins: [flowbite.plugin(), require("tailwind-scrollbar")],
};