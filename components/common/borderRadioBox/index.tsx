import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import RadioIcon from '@/assets/images/onBoard/radio.svg';
import SelectRadioIcon from '@/assets/images/onBoard/selectedRadio.svg';

interface BorderRadioBoxProps {
  title: string;
  items: { title: string; value: string }[];
  value: string;
  handleValue: (value: string) => void;
}

const BorderRadioBox: React.FC<BorderRadioBoxProps> = ({ title, items, value, handleValue }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <View
      className={`border ${isFocused || value !== '' ? 'border-subColor1' : 'border-disabledColor'} rounded-xl h-[80px] px-[20px] py-[16.5px]`}
    >
      <Text className="text-12 font-600 text-colorFont">{title}</Text>

      <View className="flex flex-row items-center gap-x-[8px]">
        {items.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => {
              handleValue(item.value);
              setIsFocused(true);
            }}
            className="flex flex-row items-center py-[3px]"
          >
            <View className="pr-[8px] py-[4px]">
              {value === item.value ? <SelectRadioIcon /> : <RadioIcon />}
            </View>
            <Text
              className={`text-14 font-500 leading-14 ${value === item.value ? 'text-basicFont' : 'text-disabledFont'}`}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default BorderRadioBox;
