import React, { useState } from 'react';
import { Text, Pressable } from 'react-native';

interface CustomCheckBoxComponentProps {
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  originalItems: Item[];
}

type Item = {
  index: number;
  id: string;
  name: string;
  select: boolean;
};

const CustomCheckBoxComponent: React.FC<CustomCheckBoxComponentProps> = ({
  value,
  setValue,
  items,
  setItems,
  originalItems,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  const select = (selectedItem: Item) => {
    const updatedItems = items.map((item) =>
      item.index === selectedItem.index ? { ...item, select: !item.select } : item,
    );

    if (selectedItem.select) {
      const newOrder = originalItems.map(
        (originalItem) =>
          updatedItems.find((item) => item.index === originalItem.index) || originalItem,
      );
      setItems(newOrder);
      setValue(value.filter((name) => name !== selectedItem.name));
    } else {
      const newOrder = [
        selectedItem,
        ...updatedItems.filter((item) => item.index !== selectedItem.index),
      ];
      setItems(newOrder);
      setValue([...value, selectedItem.name]);
    }

    setItems(updatedItems);

    handleFocus(selectedItem.index);
  };

  return (
    <>
      {items.map((item: Item) => (
        <Pressable
          key={item.index}
          className={`flex-row flex-wrap justify-center items-center rounded-[35px] border-[1px] px-[14px] py-2 mx-1 my-1 ${
            item.select ? 'border-main1 bg-[#CADFFF]' : 'border-disabled bg-white'
          }`}
          onPress={() => select(item)}
        >
          <Text
            className={`text-xs font-medium ${item.select ? 'text-main1' : 'text-disabledFont'}`}
          >
            {item.name}
          </Text>
        </Pressable>
      ))}
    </>
  );
};

export default CustomCheckBoxComponent;
