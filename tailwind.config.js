const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        qs: ['Quicksand', ...defaultTheme.fontFamily.sans],
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          DEFAULT: '#86B728',
          50: '#D6ECAA',
          100: '#CEE999',
          200: '#BDE178',
          300: '#ADDA56',
          400: '#9DD335',
          500: '#86B728',
          600: '#64891E',
          700: '#435B14',
          800: '#212D0A',
          900: '#000000',
        },
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('daisyui')],
};
