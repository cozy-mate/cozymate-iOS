import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
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

  const inputRef = React.useRef<TextInput>(null);

  // TextInput 밖에 영역 클릭 시에도 focusing 하게 하는 함수
  const handleFocus = () => {
    setIsFocused(true);
    setDatePickerVisibility(true);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 다른 곳에 focusing 옮겨졌을때 기존 focusing 없애는 함수
  const handleBlur = () => {
    setIsFocused(false);
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    const dateString = `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    setSelectedDate(dateString);
    hideDatePicker();
  };

  const isActive = isFocused || selectedDate !== '';

  return (
    <Pressable
      onPress={handleFocus}
      className={`box-border flex flex-row justify-between items-center rounded-xl border-[1px] px-5 py-4 mb-4 bg-white
        ${isActive ? 'border-sub1' : 'border-disabled'}`}
    >
      <View className="flex flex-col items-start justify-center">
        <Text
          className={`font-semibold text-xs leading-[17px] tracking-[-0.03em]
            ${isFocused ? 'text-main1' : 'text-colorFont'}`}
        >
          {title}
        </Text>
        <View className="mt-1.5 flex flex-row items-center justify-between w-full pb-[3px]">
          <Text className="text-xs font-medium text-basicFont">{selectedDate}</Text>
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
      <TextInput className="hidden" ref={inputRef} onBlur={handleBlur} />
    </Pressable>
  );
};

export default DateSelectModal;
