import React from 'react';
import { Text, View, Pressable } from 'react-native';

interface ControlModalProps {
  items: {
    index: number;
    title: string;
    pressFunc: () => void | React.Dispatch<React.SetStateAction<boolean>>;
  }[];
}

const ControlModal: React.FC<ControlModalProps> = ({ items }) => {
  return (
    <View className="absolute -right-2 -top-2 flex w-16 flex-col items-center rounded-lg border border-[#EBEBEB] bg-white px-2 py-1">
      {items.map((item) => (
        <Pressable
          key={item.index}
          onPress={item.pressFunc}
          className={`border-b border-b-[#F6F6F6] ${item.index === items.length && 'border-0'}`}
        >
          <Text className="py-1.5 text-[10px] font-medium text-basicFont">{item.title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default ControlModal;
