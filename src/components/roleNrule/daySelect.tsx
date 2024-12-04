import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';

import Selected from '@assets/roleNrule/selectedCheckBox.svg';
import NotSelected from '@assets/roleNrule/notSelectedCheckBox.svg';

interface Items {
  id: number;
  value: string;
  selected: boolean;
}

interface DaySelectProps {
  repeatDayList: string[] | null;
  setRepeatDayList: React.Dispatch<React.SetStateAction<string[] | null>>;
}

const DaySelect: React.FC<DaySelectProps> = ({ repeatDayList, setRepeatDayList }) => {
  const daysOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
  const [items, setItems] = useState<Items[]>(
    daysOfWeek.map((day, index) => ({
      id: index + 1,
      value: day,
      selected: repeatDayList?.includes(day) || false,
    })),
  );

  const selectDay = (dayValue: string) => {
    setItems((prevItems) =>
      prevItems.map((day) => (day.value === dayValue ? { ...day, selected: !day.selected } : day)),
    );
    setRepeatDayList((prevList) => {
      const updatedList = prevList ? [...prevList] : [];
      if (updatedList.includes(dayValue)) {
        const newList = updatedList.filter((item) => item !== dayValue);
        return newList.length === 0 ? null : newList;
      } else {
        return [...updatedList, dayValue];
      }
    });
  };

  const toggleUndefined = () => {
    if (repeatDayList === null || repeatDayList.length > 0) {
      // 미정 버튼 클릭 시 repeatDayList가 null이거나 길이가 1 이상이면 빈 배열로 설정
      setRepeatDayList([]); // 빈 배열로 설정
      setItems((prevItems) => prevItems.map((day) => ({ ...day, selected: false })));
    } else {
      // 빈 배열일 때만 null로 설정
      setRepeatDayList(null); // null로 설정
      setItems((prevItems) => prevItems.map((day) => ({ ...day, selected: false })));
    }
  };

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
        <Pressable onPress={toggleUndefined}>
          {repeatDayList !== null && repeatDayList?.length === 0 ? <Selected /> : <NotSelected />}
        </Pressable>
        <Text
          className={`${
            repeatDayList !== null && repeatDayList?.length === 0
              ? 'text-basicFont'
              : 'text-disabledFont'
          } text-sm font-medium`}
        >
          미정
        </Text>
      </View>
    </View>
  );
};

export default DaySelect;
