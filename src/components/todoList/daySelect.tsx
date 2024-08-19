import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import NotSelected from '@assets/todoList/notSelectedCheckBox.svg';
import Selected from '@assets/todoList/selectedCheckBox.svg';

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
      <View className="flex flex-row justify-between mb-2">
        {items.map((day) => (
          <View
            key={day.id}
            className={`${
              day.selected ? 'bg-sub1' : 'bg-colorBox'
            } w-10 h-10 flex justify-center items-center rounded-full`}
          >
            <Pressable onPress={() => selectDay(day.value)}>
              <Text
                className={`${
                  day.selected ? 'text-main1 font-semibold' : 'text-disabledFont font-medium'
                }`}
              >
                {day.value}
              </Text>
            </Pressable>
          </View>
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
