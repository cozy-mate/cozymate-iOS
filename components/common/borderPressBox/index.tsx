import React from 'react';
import { Pressable, Text } from 'react-native';

interface BorderPressBoxProps {
  title: string;
  value: string;
  placeholder: string;
  onPress: () => void;
}

const BorderPressBox: React.FC<BorderPressBoxProps> = ({ title, value, placeholder, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className="border border-disabledColor rounded-xl px-[20px] py-[18.5px] h-[80px] gap-y-[6px]"
    >
      <Text className="text-12 font-600 leading-12 text-colorFont">{title}</Text>

      <Text className={`text-14 font-500 ${value !== '' ? 'text-basicFont' : 'text-disabledFont'}`}>
        {value !== '' ? value : placeholder}
      </Text>
    </Pressable>
  );
};

export default BorderPressBox;
