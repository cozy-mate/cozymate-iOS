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
      boxShadow: {
        chipback: '0px 0px 2px rgba(107, 107, 107, 0.25)',
      },
      dropShadow: {
        topShadow: '0px 0px 8px 0px rgba(218, 218, 218, 0.25)',
      },
      colors: {
        DEFAULT: 'black',
        main1: '#68A4FF',
        main2: '#FFCE3D',
        // 피드 배경색
        main3: '#F7F8FA',

        sub1: '#CADFFF',
        sub2: '#E5F0FF',
        sub3: '#B5D3FF',

        // 폰트 색깔
        basicFont: '#5D5D6A',
        colorFont: '#808997',
        disabledFont: '#ACADB4',
        emphasizedFont: '#444955',

        disabled: '#E6E6E6',

        // 박스 색깔
        box: '#F1F1F1',
        colorBox: '#F3F6FA',

        warning: '#FF391E',

        // 소셜 로그인용 색깔
        kakaoyellow: '#FEE500',
        navergreen: '#00C73C',
        appleblack: '#121212',
      },
    },
  },
  plugins: [],
};
