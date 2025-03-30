/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './utils/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontSize: {
        20: '20px',
        18: '18px',
        16: '16px',
        14: '14px',
        12: '12px',
        10: '10px',
      },
      fontFamily: {
        700: ['Pretendard-Bold', 'System'],
        600: ['Pretendard-SemiBold', 'System'],
        500: ['Pretendard-Medium', 'System'],
        400: ['Pretendard-Regular', 'System'],
      },
      lineHeight: {
        20: '23.9px',
        18: '21.5px',
        16: '19.1px',
        '16Regular': '26.6px',
        14: '16.7px',
        '14Regular': '18.2px',
        12: '16.8px',
        10: '12px',
      },
      letterSpacing: {
        space: '-2px',
      },

      backgroundColor: {
        modalBack: 'rgba(0, 0, 0, 0.5)',
        modalBack2: 'rgba(0, 0, 0, 0.9)',
        updateButtonBack: 'rgba(62, 62, 62, 0.4)',
        lifeStyleButtonBack: 'rgba(34, 34, 34, 0.8)',
      },
      boxShadow: {
        chipback: '0px 0px 1px rgba(107, 107, 107, 0.25)',
        custom: '0px 0px 1px rgba(107, 107, 107, 0.25)',
      },
      dropShadow: {
        topShadow: '0px 0px 8px 0px rgba(218, 218, 218, 0.25)',
        buttonBack: '0px 2px 4px 0px rgba(159, 159, 159, 0.25)',
        buttonBack2: '0px 0px 2px rgba(107, 107, 107, 0.45)',
      },
      colors: {
        // 메인컬러
        mainColor: '#68A4FF',
        // 서브컬러
        subColor: '#FFCE3D',

        // 비활성화
        disabledColor: '#E6E6E6',

        // 박스컬러
        boxColor: '#F1F1F1',
        // 색박스
        colorBox: '#F3F6FA',

        // 기본폰트
        basicFont: '#6C6C77',
        // 색폰트
        colorFont: '#808997',
        // 강조폰트
        emphasizedFont: '#51555C',
        // 비활성화폰트
        disabledFont: '#ACADB4',

        // subcolor
        subColor1: '#CADFFF',
        // subcolor2
        subColor2: '#E5F0FF',
        // subcolor3
        subColor3: '#B5D3FF',

        // stroke
        strokeColor: '#F6F6F6',

        // warning
        warningColor: '#FF6868',
        // warning_sub
        warningSubColor: '#FFCACA',

        // 소셜 로그인용 색깔
        kakaoyellow: '#FEE500',
        appleblack: '#121212',

        //토스트용 색깔
        toastBackground: '#4B4B4B',
      },
    },
  },
  plugins: [],
};
