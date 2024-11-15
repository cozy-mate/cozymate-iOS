import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Pressable } from 'react-native';

import DownArrow from '@assets/onBoard/downArrow.svg';

interface Item {
  id: number;
  name: string;
}

interface SchoolSelectBoxProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  items: Item[];
  title: string;
}

const SchoolSelectBox: React.FC<SchoolSelectBoxProps> = ({ value, setValue, items, title }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [displaySchool, setDisplaySchool] = useState<string>('');
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
    setIsListOpen(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsListOpen(false);
  };

  const isCompleted = isFocused || value !== 0;

  return (
    <>
      <Pressable
        onPress={handleFocus}
        className={`flex flex-row items-center justify-between rounded-xl border bg-white px-5 py-4
         ${isFocused ? 'border-sub1' : 'border-disabled'}`}
      >
        <View className="flex flex-col justify-center space-y-1.5">
          <Text
            className={`text-xs font-semibold leading-[17px] tracking-tight
            ${isCompleted ? 'text-main1' : 'text-colorFont'}`}
          >
            {title}
          </Text>
          <View className="flex w-full flex-row items-center justify-between pb-[3px]">
            <Text
              className={`${
                value === 0 ? 'text-disabledFont' : 'text-basicFont'
              } text-sm font-medium`}
            >
              {value === 0 ? '학교를 선택해주세요' : displaySchool}
            </Text>
            <DownArrow />
          </View>
        </View>
      </Pressable>

      {isListOpen && (
        <ScrollView className="mt-1 rounded-xl border border-sub1 px-5 py-3">
          <View>
            {items.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => {
                  setValue(item.id);
                  setDisplaySchool(item.name);
                  handleBlur();
                }}
                className={`border-b border-b-[#F6F6F6] py-2 ${item.id === 1 && 'pt-0'} ${
                  item.id === 4 && 'border-b-0 pb-0'
                }`}
              >
                <Text className="text-sm font-medium text-basicFont">{item.name}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default SchoolSelectBox;
