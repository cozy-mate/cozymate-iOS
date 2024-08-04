import React, { useRef, useState } from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';

interface CustomRadioInputBoxProps {
  title: string;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  isTime: boolean;
}

type Item = {
  index: number;
  value: any;
  name: string;
  select: boolean;
};

const CustomRadioInputBox: React.FC<CustomRadioInputBoxProps> = ({
  title,
  value,
  setValue,
  items,
  setItems,
  isTime,
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
    <View className="mb-12">
      <Text className="text-base font-semibold text-emphasizedFont px-[2px] mb-2">{title}</Text>
      {isTime && <Text>AM | PM</Text>}
      <View className="flex flex-row flex-wrap">
        {items.map((item: Item) => (
          <Pressable
            key={item.index}
            className={`flex-col justify-center items-center rounded-md px-5 py-[10px] mr-2 ${
              item.select ? 'bg-sub1' : 'bg-colorBox'
            }`}
            onPress={() => select(item)}
          >
            <Text
              className={`text-xs ${
                item.select ? 'text-main1 font-semibold' : 'text-disabledFont font-medium'
              } `}
            >
              {item.name}
            </Text>
            <TextInput className="hidden" ref={inputRef} onBlur={handleBlur} />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default CustomRadioInputBox;
