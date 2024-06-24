import React, { useState } from 'react';
import { Text, View, TextInput, Pressable } from 'react-native';

interface NumberInputBoxComponentProps {
  title: string;
  value: number | null;
  setValue: React.Dispatch<React.SetStateAction<number | null>>;
  placeholder: string;
}

const NumberInputBoxComponent: React.FC<NumberInputBoxComponentProps> = ({
  title,
  value,
  setValue,
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const inputRef = React.useRef<TextInput>(null);

  // TextInput value change 함수
  const valueHandleChange = (text: string) => {
    const numericValue = parseInt(text, 10);
    setValue(isNaN(numericValue) ? null : numericValue);
  };

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

  const isActive = isFocused || value !== null;

  return (
    <Pressable
      onPress={handleFocus}
      className={`box-border flex flex-col justify-center items-start rounded-xl border-[1px] px-[22px] py-4 mb-4
        ${isActive ? 'border-main' : 'border-disabled'}`}
    >
      <View>
        <Text
          className={`font-semibold text-sm leading-[17px] tracking-[-0.03em]
            ${isActive ? 'text-main' : 'text-colorFont'}`}
        >
          {title}
        </Text>
      </View>
      <View className="mt-1.5 flex-row">
        <TextInput
          ref={inputRef}
          value={
            isFocused
              ? value !== null
                ? value.toString()
                : ''
              : value !== null
              ? `${value}년생`
              : ''
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={valueHandleChange}
          placeholder={placeholder}
          placeholderTextColor="#C0C0C0"
          className="font-medium text-sm leading-[17px] tracking-[-0.03em] text-basicFont"
          keyboardType="numeric"
        />
      </View>
    </Pressable>
  );
};

export default NumberInputBoxComponent;
