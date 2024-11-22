import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { View, Text, Pressable, TextInput } from 'react-native';

import DownArrow from '@assets/onBoard/downArrow.svg';

interface MajorSelectProps {
  value: number | string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  items: string[];
  title: string;
}

const MajorSelect: React.FC<MajorSelectProps> = ({ value, setValue, items, title }) => {
  const inputRef = React.useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsListOpen(false);
  };

  const isActive = isFocused || value !== '';

  return (
    <>
      <Pressable
        onPress={() => {
          handleFocus();
          setIsListOpen(!isListOpen);
        }}
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
              className={`${
                value === 0 ? 'text-disabledFont' : 'text-basicFont'
              } text-sm font-medium`}
            >
              {value}
            </Text>
            <DownArrow />
          </View>
        </View>
        <TextInput className="hidden" ref={inputRef} onBlur={handleBlur} />
      </Pressable>

      {isListOpen && (
        <ScrollView className="mb-4 mt-[-12px] h-1/2 rounded-xl border border-sub1 px-5 py-3">
          <View className="pb-8">
            {items &&
              items.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    setValue(item);

                    setIsListOpen(false);
                  }}
                  className={`border-b border-b-[#F6F6F6] py-2 ${
                    typeof item === 'string' && index === items.length - 1 && 'border-b-0 pb-0'
                  } ${typeof item === 'string' && index === 0 && 'pt-0'}`}
                >
                  <Text className="text-sm font-medium text-basicFont">{item}</Text>
                </Pressable>
              ))}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export default MajorSelect;
