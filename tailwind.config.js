/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        'weather-app': "url('/bg_clima.jpg')",
      },
    },
  },
  plugins: [],
}

