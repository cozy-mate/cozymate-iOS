import React, { useState } from 'react';
import { Text, View, TextInput, Pressable } from 'react-native';

interface NumberInputBoxComponentProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
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
    setValue(text);
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

  const isActive = isFocused || !!value;

  return (
    <Pressable
      onPress={handleFocus}
      className={
        isActive
          ? 'flex-col justify-center rounded-xl border-2 border-main px-5 py-4 mb-4'
          : 'flex-col justify-center rounded-xl border-2 border-[#E2E2E2] px-5 py-4 mb-4'
      }
    >
      <Text className={isActive ? 'text-main font-semibold' : 'text-[#808197] font-semibold'}>
        {title}
      </Text>
      <View className="mt-1.5 flex-row">
        <TextInput
          ref={inputRef}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={valueHandleChange}
          placeholder={placeholder}
          placeholderTextColor="#C0C0C0"
          className="mr-2 flex-1 font-semibold"
          keyboardType="numeric"
        />
      </View>
    </Pressable>
  );
};

export default NumberInputBoxComponent;
