import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';

import DownArrow from '@assets/onBoard/downArrow.svg';

interface SchoolSelectProps {
  school: string;
  setSchool: React.Dispatch<React.SetStateAction<string>>;
  title: string;
}

const SchoolSelect: React.FC<SchoolSelectProps> = ({ school, setSchool, title }) => {
  const inputRef = React.useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // TextInput 밖에 영역 클릭 시에도 focusing 하게 하는 함수
  const handleFocus = () => {
    setIsFocused(true);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 다른 곳에 focusing 옮겨졌을때 기존 focusing 없애는 함수
  const handleBlur = () => {
    setIsFocused(false);
  };

  const isActive = isFocused || school !== '';

  return (
    <Pressable
      onPress={handleFocus}
      className={`mb-4 box-border flex flex-row items-center justify-between rounded-xl border bg-white px-5 py-4
        ${isActive ? 'border-sub1' : 'border-disabled'}`}
    >
      <View className="flex flex-col items-start justify-center">
        <Text
          className={`text-xs font-semibold leading-[17px] tracking-tight
            ${isFocused ? 'text-main1' : 'text-colorFont'}`}
        >
          {title}
        </Text>
        <View className="mt-1.5 flex w-full flex-row items-center justify-between pb-[3px]">
          <Text
            className={`${school === '' ? 'text-sm text-disabledFont' : 'text-xs text-basicFont'} font-medium`}
          >
            {school === '' ? '학교를 선택해주세요' : school}
          </Text>
          <DownArrow />
        </View>
      </View>

      <TextInput className="hidden" ref={inputRef} onBlur={handleBlur} />
    </Pressable>
  );
};

export default SchoolSelect;
