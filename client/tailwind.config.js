/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
     'bg-primary': '#1a1a1a',
      'bg-secondary': '#2b2b2b',
      'text-primary': '#fcfcfc',
      'text-secondary': '#1a1a1a',
      'primary': '#c10000',
      'primary-light': '#241818',
      'secondary': '#c4c4c4',
      'accent': '#99ff66',
      'accent-light': '#465c2f',
    },
    extend: {
      dropShadow: {
        primary: '0 0 .75rem #c10000',
      }
    },
  },
  plugins: [],
}