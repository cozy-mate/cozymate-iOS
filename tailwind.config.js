/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './AppInner.{js,jsx,ts,tsx}',
    './src/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        DEFAULT: 'black',
        kakaoyellow: '#FEE500',
        navergreen: '#00C73C',
        appleblack: '#121212',

        'button-black': {
          text: '#F3F3F3',
        },
      },
    },
  },
  plugins: [],
};
