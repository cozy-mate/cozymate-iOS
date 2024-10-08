import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';

import Selected from '@assets/todoList/selectedCheckBox.svg';
import NotSelected from '@assets/todoList/notSelectedCheckBox.svg';

interface Items {
  id: number;
  value: string;
  selected: boolean;
}

interface DaySelectProps {
  repeatDayList: string[];
  setRepeatDayList: React.Dispatch<React.SetStateAction<string[]>>;
}

const DaySelect: React.FC<DaySelectProps> = ({ repeatDayList, setRepeatDayList }) => {
  const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
  const [items, setItems] = useState<Items[]>(
    daysOfWeek.map((day, index) => ({
      id: index + 1,
      value: day,
      selected: repeatDayList.includes(day),
    })),
  );

  const selectDay = (dayValue: string) => {
    setItems((prevItems) =>
      prevItems.map((day) => (day.value === dayValue ? { ...day, selected: !day.selected } : day)),
    );
    setRepeatDayList((prevList) =>
      prevList.includes(dayValue)
        ? prevList.filter((item) => item !== dayValue)
        : [...prevList, dayValue],
    );
  };

  const toggleAllDays = () => {
    const areAllDaysSelected = items.every((day) => day.selected);
    if (areAllDaysSelected) {
      setItems((prevItems) => prevItems.map((day) => ({ ...day, selected: false })));
      setRepeatDayList([]);
    } else {
      setItems((prevItems) => prevItems.map((day) => ({ ...day, selected: true })));
      setRepeatDayList(daysOfWeek);
    }
  };

  const isEveryDay = items.every((day) => day.selected);

  return (
    <View className="flex flex-col">
      <Text className="mb-3 text-lg font-semibold text-basicFont">정해진 요일을 선택해주세요</Text>
      <View className="mb-2 flex flex-row justify-between">
        {items.map((day) => (
          <Pressable key={day.id} onPress={() => selectDay(day.value)}>
            <View
              className={`${
                day.selected ? 'bg-sub1' : 'bg-colorBox'
              } flex h-10 w-10 items-center justify-center rounded-full`}
            >
              <Text
                className={`${
                  day.selected ? 'font-semibold text-main1' : 'font-medium text-disabledFont'
                }`}
              >
                {day.value}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
      <View className="flex flex-row items-center">
        <Pressable onPress={toggleAllDays}>{isEveryDay ? <Selected /> : <NotSelected />}</Pressable>
        <Text
          className={`${isEveryDay ? 'text-basicFont' : 'text-disabledFont'} text-sm font-medium`}
        >
          매일
        </Text>
      </View>
    </View>
  );
};

export default DaySelect;
