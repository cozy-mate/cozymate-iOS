import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';

interface CustomRadioBoxComponentProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

type Item = {
  index: number;
  value: number;
  name: string;
  select: boolean;
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
      select: item.index === selectedItem.index,
    }));
    setItems(updatedItems);
    setValue(selectedItem.value);
    handleFocus(selectedItem.index);
  };

  return (
    <View className="flex flex-row flex-wrap">
      {items.map((item: Item) => (
        <Pressable
          key={item.index}
          className={`mr-2 flex-col items-center justify-center rounded-md px-5 py-[10px] ${
            focusedIndex === item.index ? 'bg-sub1' : 'bg-colorBox'
          }`}
          onPress={() => select(item)}
        >
          <Text
            className={`text-xs ${
              focusedIndex === item.index
                ? 'font-semibold text-main1'
                : 'font-medium text-disabledFont'
            } `}
          >
            {item.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default CustomRadioBoxComponent;
