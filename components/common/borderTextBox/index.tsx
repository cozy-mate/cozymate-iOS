import React from 'react';
import { Text, TextInput, View } from 'react-native';

interface BorderTextBoxProps {
  title: string;
  value: string;
  placeholder: string;
}

const BorderTextBox: React.FC<BorderTextBoxProps> = ({ title, value, placeholder }) => {
  return (
    <View className="border border-disabled rounded-xl h-20 pl-5 pt-[18.5px]">
      <Text className="text-12 font-600 text-colorFont">{title}</Text>
      <TextInput value={value} placeholder={placeholder} placeholderTextColor={'#ACADB4'} />
    </View>
  );
};

export default BorderTextBox;
