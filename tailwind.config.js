/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        lumen: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          900: '#0c4a6e',
          950: '#082f49',
        },
        accent: {
          purple: '#a855f7',
        }
      },
      fontFamily: {
  sans: ['Outfit', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}