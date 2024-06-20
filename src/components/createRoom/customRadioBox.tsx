import React, { useRef, useState } from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';

interface CustomRadioBoxComponentProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

type Item = {
  index: number;
  item: string;
  select: boolean;
};

const CustomRadioBoxComponent: React.FC<CustomRadioBoxComponentProps> = ({
  title,
  value,
  setValue,
  items,
  setItems,
}) => {
  const select = (selectedItem: Item) => {
    const updatedItems = items.map((item) => ({
      ...item,
      select: item.index === selectedItem.index ? true : false,
    }));
    setItems(updatedItems);
    setValue(selectedItem.item);
  };

  return (
    <View>
      <Text className="text-[#5D5D6A] pl-1 font-semibold mb-2">{title}</Text>
      <View className="flex flex-row flex-wrap">
        {items.map((item: Item) => (
          <Pressable
            key={item.index}
            className={`flex-col justify-center items-center rounded-xl px-5 py-[10px] mr-2 mb-2 ${
              item.select ? 'bg-main' : 'bg-[#F6F7F9]'
            }`}
            onPress={() => select(item)}
          >
            <Text
              className={`text-xs font-medium ${item.select ? 'text-white' : 'text-[#ACADB4]'}`}
            >
              {item.item}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default CustomRadioBoxComponent;
