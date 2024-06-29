import React, { useRef, useState } from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';

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
          className={`flex-col justify-center items-center rounded-md px-5 py-[10px] mr-2 ${
            item.select ? 'bg-main' : 'bg-[#F6F7F9]'
          }`}
          onPress={() => select(item)}
        >
          <Text
            className={`text-xs font-medium ${item.select ? 'text-white' : 'text-disabledFont'} `}
          >
            {item.name}
          </Text>
          <TextInput className="hidden" ref={inputRef} onBlur={handleBlur} />
        </Pressable>
      ))}
    </View>
  );
};

export default CustomRadioBoxComponent;
