import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { TodoItem } from '@zustand/todo/type';

interface SettingModalProps {
  items: { text: string; pressFunc: (item: TodoItem) => void }[];
}

const SettingModal: React.FC<SettingModalProps> = ({ items }) => {
  return (
    <View className="absolute -right-5 top-3 flex w-16 flex-col items-center rounded-lg border border-[#EBEBEB] bg-white px-2 py-1">
      {items.map((item, index) => (
        <Pressable
          key={index}
          onPress={() => item.pressFunc}
          className={`border-b border-b-[#F6F6F6] ${index === items.length - 1 && 'border-0'}`}
        >
          <Text className="py-1.5 text-[10px] font-medium text-basicFont">{item.text}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default SettingModal;
