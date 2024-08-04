import React from 'react';
import { Text, TextInput, View } from 'react-native';

interface CustomTextInputBoxProps {
  name: string;
  placeholder: string;
}

const CustomTextInputBox: React.FC<CustomTextInputBoxProps> = ({ name, placeholder }) => {
  return (
    <View className="mb-12">
      <Text className="text-base font-semibold text-emphasizedFont px-[2px] mb-2">
        {name} 입력해주세요
      </Text>
      <TextInput
        placeholder={`ex. ${placeholder}`}
        className="p-4 bg-colorBox text-disabledFont rounded-xl"
      />
    </View>
  );
};

export default CustomTextInputBox;
