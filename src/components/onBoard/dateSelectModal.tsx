import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import DownArrow from '@assets/onBoard/downArrow.svg';

interface DatePickerComponentProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  title: string;
}

const DateSelectModal: React.FC<DatePickerComponentProps> = ({
  selectedDate,
  setSelectedDate,
  title,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    setDatePickerVisibility(true);
  };

  const handleBlur = () => {
    setDatePickerVisibility(false);
    setIsFocused(false);
  };

  const hideDatePicker = () => {};

  const [displayDate, setDisplayDate] = useState<string>(selectedDate ? selectedDate : '');

  const handleConfirm = (date: Date) => {
    const formattedDateForStorage = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    const formattedDateForDisplay = `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일`;

    setSelectedDate(formattedDateForStorage);
    setDisplayDate(formattedDateForDisplay);
    handleBlur();
  };

  const isCompleted = isFocused || selectedDate !== '';

  return (
    <Pressable
      onPress={handleFocus}
      className={`flex flex-row items-center justify-between rounded-xl border bg-white p-5
        ${isFocused ? 'border-sub1' : 'border-disabled'}`}
    >
      <View className="flex flex-col justify-center space-y-1.5">
        <Text
          className={`text-xs font-semibold leading-[18px] tracking-tight
            ${isCompleted ? 'text-main1' : 'text-colorFont'}`}
        >
          {title}
        </Text>
        <View className="flex w-full flex-row items-center justify-between">
          <Text className="text-sm font-medium leading-[18px] text-basicFont">{displayDate}</Text>
          <DownArrow />
        </View>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale="ko-KR"
      />
    </Pressable>
  );
};

export default DateSelectModal;
