import React, { useRef, useState } from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';

interface CustomRadioBoxComponentProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

type Item = {
  index: number;
  item: string;
  select: boolean;
  selected: React.FC;
  notSelected: React.FC;
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
    <>
      {items.map((item: Item) => (
        <Pressable
          key={item.index}
          className={`flex-col w-[45%] justify-center items-center rounded-xl border-[1px] px-5 py-4 mb-4 ${
            focusedIndex === item.index
              ? 'border-main bg-colorBox'
              : 'border-disabled bg-transparent'
          }`}
          onPress={() => select(item)}
        >
          <Text className={`font-semibold ${item.select ? 'text-main' : 'text-disabledFont'}`}>
            {item.item}
          </Text>
          {item.select ? (
            <View className="mt-2.5">
              <item.selected />
            </View>
          ) : (
            <View className="mt-2.5">
              <item.notSelected />
            </View>
          )}
          <TextInput className="hidden" ref={inputRef} onBlur={handleBlur} />
        </Pressable>
      ))}
    </>
  );
};

export default CustomRadioBoxComponent;
