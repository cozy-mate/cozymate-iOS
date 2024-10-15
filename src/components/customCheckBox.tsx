import React, { useState } from 'react';
import { Text, Pressable } from 'react-native';

type Item = {
  index: number;
  id: string;
  name: string;
  select: boolean;
};

interface CustomCheckBoxComponentProps {
  value: string[];
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const CustomCheckBoxComponent: React.FC<CustomCheckBoxComponentProps> = ({
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
    // 'select' 상태를 반전시킴
    const updatedItems = items.map((item) =>
      item.index === selectedItem.index ? { ...item, select: !item.select } : item,
    );

    if (selectedItem.select) {
      // 이미 선택된 경우, 리스트에서 제거
      setValue(value.filter((id) => id !== selectedItem.id));
    } else {
      // 선택되지 않은 경우, 리스트에 추가
      setValue([...value, selectedItem.id]);
    }

    setItems(updatedItems);
    handleFocus(selectedItem.index);
  };

  return (
    <>
      {items.map((item: Item) => (
        <Pressable
          key={item.index}
          className={`mb-3 mr-2 flex-row flex-wrap items-center justify-center rounded-full border px-[14px] py-2 ${
            item.select ? 'border-main1 bg-sub1' : 'border-disabled bg-white'
          }`}
          onPress={() => select(item)}
        >
          <Text
            className={`text-center text-sm font-medium tracking-tighter ${item.select ? 'text-main1' : 'text-disabledFont'}`}
          >
            {item.name}
          </Text>
        </Pressable>
      ))}
    </>
  );
};

export default CustomCheckBoxComponent;
