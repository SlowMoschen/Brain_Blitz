/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      text : {
        white: '#fcfcfc',
        black: '#1a1a1a',
      }, 
      background: {
        primary: '#1a1a1a',
        secondary: '#2b2b2b',
      },
      primary: {
        default: '#c10000',
        light: '#241818',
      },
      secondary: {
        default: '#c4c4c4',
      },
      accent: {
        default: '#99ff66',
        light: '#465c2f',
      },
    },
    extend: {},
  },
  plugins: [],
}