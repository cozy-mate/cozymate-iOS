import React, { useRef, useState } from 'react';
import { Text, View, Pressable, TextInput } from 'react-native';

import RadioButtonSvg from '@assets/onBoard/radioBox.svg';
import SelectedRadioButtonSvg from '@assets/onBoard/selectedRadioBox.svg';

interface RadioBoxComponentProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

type Item = { index: number; item: string; select: boolean };

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
    setValue(selectedItem.item);
    handleFocus();
  };

  return (
    <>
      {isFocused ? (
        <Pressable
          className="flex-col justify-center rounded-xl border-2 border-[#928DD1] px-5 py-4 mb-4"
          onPress={handleFocus}
        >
          <Text className="text-[#928DD1] font-semibold">{title}</Text>

          <View className="mt-2.5 flex-row">
            {items.map((item: Item) => {
              return (
                <View key={item.index}>
                  {item.select ? (
                    <Pressable
                      className="mr-2.5 flex-row items-center"
                      onPress={() => select(item)}
                    >
                      <SelectedRadioButtonSvg className="mr-1" />
                      <Text className="text-[#46464B]">{item.item}</Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      className="mr-2.5 flex-row items-center"
                      onPress={() => select(item)}
                    >
                      <RadioButtonSvg className="mr-1" />
                      <Text className="text-[#ACADB4]">{item.item}</Text>
                    </Pressable>
                  )}
                </View>
              );
            })}
          </View>

          {/* focus Ref를 위한 가짜 TextInput */}
          <TextInput className="hidden" ref={inputRef} onBlur={handleBlur} />
        </Pressable>
      ) : (
        <Pressable
          className="flex-col justify-center rounded-xl border-2 border-[#E2E2E2] px-5 py-4 mb-4"
          onPress={handleFocus}
        >
          <Text className="text-[#808197] font-semibold">{title}</Text>

          <View className="mt-2.5 flex-row">
            {items.map((item: Item) => {
              return (
                <View key={item.index}>
                  {item.select ? (
                    <Pressable
                      className="mr-2.5 flex-row items-center"
                      onPress={() => select(item)}
                    >
                      <SelectedRadioButtonSvg className="mr-1" />
                      <Text className="text-[#46464B]">{item.item}</Text>
                    </Pressable>
                  ) : (
                    <Pressable
                      className="mr-2.5 flex-row items-center"
                      onPress={() => select(item)}
                    >
                      <RadioButtonSvg className="mr-1" />
                      <Text className="text-[#ACADB4]">{item.item}</Text>
                    </Pressable>
                  )}
                </View>
              );
            })}
          </View>

          {/* focus Ref를 위한 가짜 TextInput */}
          <TextInput className="hidden" ref={inputRef} onBlur={handleBlur} />
        </Pressable>
      )}
    </>
  );
};

export default RadioBoxComponent;
