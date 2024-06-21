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
        main: '#68A4FF',
        sub: '#FFCE3D',

        disabled: '#E6E6E6',

        // 폰트 색깔
        basicFont: '#5D5D6A',
        colorFont: '#808997',
        disabledFont: '#ACADB4',
        emphasizedFont: '#444955',

        // 박스 색깔
        box: '#F1F1F1',
        colorBox: '#F3F6FA',

        // 소셜 로그인용 색깔
        kakaoyellow: '#FEE500',
        navergreen: '#00C73C',
        appleblack: '#121212',
      },
    },
  },
  plugins: [],
};
