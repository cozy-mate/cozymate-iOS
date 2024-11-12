import React, { useRef, useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import RadioButton from '@assets/onBoard/radioBox.svg';
import SelectedRadioButton from '@assets/onBoard/selectedRadioBox.svg';

interface Item {
  index: number;
  value: string;
  item: string;
  select: boolean;
}

interface GenderSelectBoxProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const GenderSelectBox: React.FC<GenderSelectBoxProps> = ({ value, setValue }) => {
  const [items, setItems] = useState<Item[]>([
    { index: 1, value: 'MALE', item: '남자', select: false },
    { index: 2, value: 'FEMALE', item: '여자', select: false },
  ]);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const select = (selectedItem: Item) => {
    const updatedItems = items.map((item) => ({
      ...item,
      select: item.index === selectedItem.index ? true : false,
    }));
    setItems(updatedItems);
    setValue(selectedItem.value);
    handleBlur();
  };

  const isCompleted = isFocused || value !== '';

  return (
    <Pressable
      onPress={handleFocus}
      className={`flex flex-row items-center justify-between rounded-xl border bg-white p-5 ${
        isFocused ? 'border-sub1' : 'border-disabled'
      }`}
    >
      <View className="space-y-1.5">
        <Text
          className={`text-xs font-semibold leading-[15px] tracking-tight ${
            isCompleted ? 'text-main1' : 'text-colorFont'
          }`}
        >
          성별
        </Text>
        <View className="flex flex-row space-x-2">
          {items.map((item: Item) => (
            <View key={item.index}>
              <Pressable
                className="flex flex-row items-center space-x-1"
                onPress={() => select(item)}
              >
                {item.select ? <SelectedRadioButton /> : <RadioButton />}
                <Text
                  className={`text-sm font-medium leading-4 tracking-tight ${
                    item.select ? 'text-basicFont' : 'text-disabledFont'
                  } `}
                >
                  {item.item}
                </Text>
              </Pressable>
            </View>
          ))}
        </View>
      </View>

      <TextInput className="hidden" ref={inputRef} onBlur={handleBlur} />
    </Pressable>
  );
};

export default GenderSelectBox;
