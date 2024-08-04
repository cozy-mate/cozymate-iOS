import React, { useRef, useState } from 'react';
import { View, Pressable, TextInput } from 'react-native';

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

  const inputRef = useRef<TextInput>(null);

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    setFocusedIndex(null);
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
    <View className="flex flex-row flex-wrap">
      {items.map((item: Item) => (
        <Pressable
          key={item.index}
          onPress={() => select(item)}
          className={`mb-10 mr-4 ${item.index % 4 === 0 && 'mr-0'}`}
        >
          <View className="relative">
            <item.icon />
            {item.select && (
              <View className="absolute">
                <Check />
              </View>
            )}
          </View>
          <TextInput className="hidden" ref={inputRef} onBlur={handleBlur} />
        </Pressable>
      ))}
    </View>
  );
};

export default CustomRadioBoxComponent;
