import { ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, TouchableWithoutFeedback } from 'react-native';

import DownArrow from '@assets/onBoard/downArrow.svg';

interface Item {
  id: number;
  name: string;
}

interface UnivInfoSelectProps {
  value: number | string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  items?: Item[] | string[];
  title: string;
}

const UnivInfoSelect: React.FC<UnivInfoSelectProps> = ({ value, setValue, items, title }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [displaySchool, setDisplaySchool] = useState<string>('');

  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setIsListOpen(false);
  };

  const isActive = isFocused || value !== '';

  useEffect(() => {
    if (typeof value === 'string' && value !== '') {
      setDisplaySchool(value);
    }
  }, [value]);

  return (
    <TouchableWithoutFeedback onPress={handleBlur}>
      <View>
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
                {value === 0 ? '학교를 선택해주세요' : displaySchool}
              </Text>
              <DownArrow />
            </View>
          </View>
        </Pressable>

        {isListOpen && (
          <ScrollView className="mb-4 mt-[-12px] h-1/2 rounded-xl border border-sub1 px-5 py-3">
            <View className="pb-8">
              {items &&
                items.map((item, index) => (
                  <Pressable
                    key={typeof item === 'string' ? index : item.id}
                    onPress={() => {
                      if (typeof item === 'string') {
                        setValue(item);
                        setDisplaySchool(item);
                      } else {
                        setValue(item.name);
                        setDisplaySchool(item.name);
                      }
                      setIsListOpen(false);
                    }}
                    className={`border-b border-b-[#F6F6F6] py-2 ${
                      typeof item === 'string' && index === items.length - 1 && 'border-b-0 pb-0'
                    } ${typeof item === 'string' && index === 0 && 'pt-0'}`}
                  >
                    <Text className="text-sm font-medium text-basicFont">
                      {typeof item === 'string' ? item : item.name}
                    </Text>
                  </Pressable>
                ))}
            </View>
          </ScrollView>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default UnivInfoSelect;
