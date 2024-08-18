import React, { useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales.fr = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: "Aujourd'hui",
};

LocaleConfig.defaultLocale = 'fr';

const CustomCalendar = () => {
  const [selected, setSelected] = useState('');

  return (
    <Calendar
      enableSwipeMonths={true}
      onDayPress={(day: any) => setSelected(day.dateString)}
      markedDates={{
        [selected]: { selected: true, disableTouchEvent: true },
      }}
      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',

        // 요일 글씨색
        textSectionTitleColor: 'rgba(60, 60, 67, 0.6)',
        textSectionTitleFontSize: 16,

        // 이전 달과 다음 달 날짜의 글씨색
        textDisabledColor: '#808080',

        // 선택된 날짜 배경색 (동그라미)
        selectedDayBackgroundColor: '#CADFFF',
        // 선택된 날짜 글씨색
        selectedDayTextColor: '#68A4FF',

        // 오늘 날짜 글씨색
        todayTextColor: '#68A4FF',

        // 날짜 글씨색
        dayTextColor: 'black',

        // 화살표 색
        arrowColor: 'black',

        monthTextColor: 'black',
        textMonthFontSize: 18,
        textMonthFontWeight: 'bold',

        textDayFontFamily: 'Poppins',
        textMonthFontFamily: 'Poppins',
        textDayHeaderFontFamily: 'Poppins',

        textDayFontWeight: 'regular',
      }}
    />
  );
};

export default CustomCalendar;
