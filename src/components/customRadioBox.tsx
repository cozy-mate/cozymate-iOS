import React, { useRef, useState } from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';

interface CustomRadioBoxComponentProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  items: Character[];
  updateCharacters: (updatedCharacters: Character[]) => void;
}

type Character = {
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
  updateCharacters,
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

  const select = (selectedItem: Character) => {
    const updatedItems = items.map((item) => ({
      ...item,
      select: item.index === selectedItem.index ? true : false,
    }));
    updateCharacters(updatedItems);
    setValue(selectedItem.item);
    handleFocus(selectedItem.index);
  };

  return (
    <>
      {items.map((item: Character) => (
        <Pressable
          key={item.index}
          className="flex-col items-center justify-center"
          onPress={() => select(item)}
        >
          {item.select ? (
            <View className="mb-2 border-2">
              <item.selected />
            </View>
          ) : (
            <View className="mb-2">
              <item.notSelected />
            </View>
          )}
          <Text className="text-sm font-semibold text-basicFont">{item.item}</Text>
          <TextInput className="hidden" ref={inputRef} onBlur={handleBlur} />
        </Pressable>
      ))}
    </>
  );
};

export default CustomRadioBoxComponent;
