import React, { useRef, useState } from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';

import RadioButtonSvg from '@assets/onBoard/radioBox.svg';
import SelectedRadioButtonSvg from '@assets/onBoard/selectedRadioBox.svg';

type Item = { index: number; value: string; item: string; select: boolean };

interface RadioBoxComponentProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const RadioBoxComponent: React.FC<RadioBoxComponentProps> = ({
  title,
  value,
  setValue,
  items,
  setItems,
}) => {
  const [isFocused, setIsFocused] = useState(false); // focusing 여부 판별 변수

  const inputRef = useRef<TextInput>(null); // focusing ref

  // TextInput 밖에 영역 클릭 시에도 focusing 하게 하는 함수
  const handleFocus = () => {
    setIsFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 다른 곳에 focusing 옮겨졌을때 기존 focusing 없애는 함수
  const handleBlur = () => {
    setIsFocused(false);
  };

  // item 선택
  const select = (selectedItem: Item) => {
    const updatedItems = items.map((item) => ({
      ...item,
      select: item.index === selectedItem.index ? true : false,
    }));
    setItems(updatedItems);
    setValue(selectedItem.value);
    handleFocus();
  };

  const isActive = isFocused || value !== '';

  return (
    <Pressable
      onPress={handleFocus}
      className={`mb-4 box-border flex flex-col items-start justify-center rounded-xl border px-5 py-4 ${
        isActive ? 'border-sub1' : 'border-disabled'
      }`}
    >
      <View>
        <Text
          className={`text-main text-xs font-semibold leading-[17px] tracking-tight ${
            isFocused ? 'text-main1' : 'text-colorFont'
          }`}
        >
          {title}
        </Text>
        <View className="mt-1.5 flex-row">
          {items.map((item: Item) => (
            <View key={item.index}>
              {item.select ? (
                <Pressable className="mr-2 flex-row items-center" onPress={() => select(item)}>
                  <SelectedRadioButtonSvg className="mr-1" />
                  <Text className="text-sm font-medium leading-[17px] tracking-tight text-basicFont">
                    {item.item}
                  </Text>
                </Pressable>
              ) : (
                <Pressable className="mr-2 flex-row items-center" onPress={() => select(item)}>
                  <RadioButtonSvg className="mr-1" />
                  <Text className="text-sm font-medium leading-[17px] tracking-tight text-disabledFont">
                    {item.item}
                  </Text>
                </Pressable>
              )}
            </View>
          ))}
        </View>
      </View>
      {/* focus Ref를 위한 가짜 TextInput */}
      <TextInput className="hidden" ref={inputRef} onBlur={handleBlur} />
    </Pressable>
  );
};

export default RadioBoxComponent;
