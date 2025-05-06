/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          500: '#EDAD2A',
          600: '#d69523',
          700: '#b97f1e',
          800: '#996819',
          900: '#7a5314',
        },
      },
    },
  },
  plugins: [],
};
