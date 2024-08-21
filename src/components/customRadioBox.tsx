import React, { useState } from 'react';
import { View, Pressable } from 'react-native';

import Check from '@assets/characterItem/check.svg';

interface CustomRadioBoxComponentProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

type Item = {
  index: number;
  item: number;
  select: boolean;
  icon: React.FC;
};

const CustomRadioBoxComponent: React.FC<CustomRadioBoxComponentProps> = ({
  value,
  setValue,
  items,
  setItems,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const select = (selectedItem: Item) => {
    const updatedItems = items.map((item) => ({
      ...item,
      select: item.index === selectedItem.index ? true : false,
    }));
    setItems(updatedItems);
    setValue(selectedItem.item);
    handleFocus(selectedItem.index);
  };

  return (
    <View className="flex flex-row flex-wrap gap-x-4 gap-y-8">
      {items.map((item: Item) => (
        <Pressable key={item.index} onPress={() => select(item)}>
          <View className="relative">
            <item.icon />
            {focusedIndex === item.index && (
              <View className="absolute">
                <Check />
              </View>
            )}
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default CustomRadioBoxComponent;
