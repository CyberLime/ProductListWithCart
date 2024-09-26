/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "my-red": "hsl(14, 86%, 42%)",
        "my-red-hover": "hsl(14, 85%, 23%)",
        "my-green": "hsl(159, 69%, 38%)",
        "my-r-50": "hsl(20, 50%, 98%)",
        "my-r-100": "hsl(13, 31%, 94%)",
        "my-r-300": "hsl(14, 25%, 72%)",
        "my-r-400": "hsl(7, 20%, 60%)",
        "my-r-500": "hsl(12, 20%, 44%)",
        "my-r-900": "hsl(14, 65%, 9%)",
      },
      fontSize: {
        product: "16px",
      },
    },
  },
  plugins: [],
};
