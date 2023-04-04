/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-kaisei)'],
      },
      colors: {
        "sec-text": "#444444",
        purplevs: '#a173c2',
        redvs: '#e46b76',
        greenvs: '#98c177',
        bluevs: '#61b4f8',
        orangevs: '#d19a66',
        whitevs: '#abb2bf',
        primary: {
          // Customize it on globals.css :root
          200: 'rgb(var(--tw-clr-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-clr-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-clr-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-clr-primary-500) / <alpha-value>)',
        },
        dark: '#222222',
        brand: {
          50: "#fff6fa",
          100: "#ffedf5",
          200: "#ffd3e5",
          300: "#ffb8d5",
          400: "#fe82b6",
          500: "#fe4d97",
          600: "#e54588",
          700: "#bf3a71",
          800: "#982e5b",
          900: "#7c264a",
          DEFAULT: "#fe4d97",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
