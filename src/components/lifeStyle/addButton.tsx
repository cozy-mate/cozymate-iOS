import React from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';

import PlusCircle from '@assets/lifeStyle/plus.svg';

interface AddButtonProps {
  title: string;
  inputs: string[];
  onInputChange: (text: string, index: number) => void;
  onAddInput: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ title, inputs, onInputChange, onAddInput }) => {
  return (
    <View className="mb-12">
      <Text className="mb-3 text-base font-semibold text-emphasizedFont">{title}</Text>
      {inputs.map((input, index) => (
        <TextInput
          key={index}
          className="mb-2 rounded-xl bg-colorBox p-4 text-basicFont"
          value={input}
          onChangeText={(text) => onInputChange(text, index)}
        />
      ))}
      <Pressable onPress={onAddInput}>
        <View className="flex flex-row items-center rounded-xl bg-colorBox p-4">
          <PlusCircle />
          <Text className="ml-1.5 text-sm font-medium text-disabledFont">내용 추가하기</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default AddButton;
