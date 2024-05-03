/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'dark-blue-black': '#222831',
        'dark-grayish-blue': '#31363F',
        'light-bluish-green': '#76ABAE',
        'light-gray': '#EEEEEE',
      }
    },
  },
  plugins: [],
}

