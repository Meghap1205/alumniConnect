
import flowbite from "flowbite-react/tailwind";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", ...flowbite.content],
  theme: {
    extend: {
      fontFamily: {
        grype: ['Grype', 'sans-serif'],
      },
    },
  },
  plugins: [flowbite],
};
