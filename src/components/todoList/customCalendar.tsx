import moment from 'moment';
import React, { useMemo, useState } from 'react';
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

interface TodoItem {
  id: number;
  completed: boolean;
  content: string;
  date: string; // 날짜 정보가 있어야 합니다. 형식은 'YYYY-MM-DD'
}

interface CustomCalendarProps {
  canSelectPrev: boolean;
  onDateTimeSelect: (dateTime: string) => void;
  todoData?: TodoItem[]; // 할 일 데이터를 선택적으로 받습니다.
  useMarkedDates?: boolean; // markedDates를 사용할지 여부를 받습니다.
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  canSelectPrev,
  onDateTimeSelect,
  todoData = [], // 기본값으로 빈 배열 설정
  useMarkedDates = true, // 기본값으로 markedDates를 사용하도록 설정
}) => {
  const today = moment().format('YYYY-MM-DD');
  const [selected, setSelected] = useState(today);

  const minDate = canSelectPrev ? undefined : today;

  const markedDates = useMemo(() => {
    if (!useMarkedDates) return {}; // markedDates 사용하지 않는 경우 빈 객체 반환

    const marks: { [key: string]: any } = {};

    todoData.forEach((todo) => {
      if (todo.date) {
        marks[todo.date] = {
          marked: true,
          dotColor: 'blue',
          activeOpacity: 0,
        };
      }
    });

    marks[selected] = {
      selected: true,
      disableTouchEvent: true,
      selectedDayBackgroundColor: '#CADFFF',
      selectedDayTextColor: '#68A4FF',
    };

    return marks;
  }, [selected, todoData, useMarkedDates]);

  return (
    <Calendar
      enableSwipeMonths={true}
      minDate={minDate}
      onDayPress={(day: any) => {
        onDateTimeSelect(day.dateString);
        setSelected(day.dateString);
      }}
      markedDates={useMarkedDates ? markedDates : {}} // useMarkedDates가 true일 때만 markedDates 적용
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

        textDayFontWeight: '400',
      }}
    />
  );
};

export default CustomCalendar;
