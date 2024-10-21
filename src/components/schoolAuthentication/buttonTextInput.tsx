import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';

interface ButtonTextInputProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  buttonString: string;
  buttonFunc: () => void;
}

const ButtonTextInput: React.FC<ButtonTextInputProps> = ({
  title,
  value,
  setValue,
  placeholder,
  buttonString,
  buttonFunc,
}) => {
  const inputRef = React.useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

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

  const isActive = isFocused || value !== '';

  return (
    <Pressable
      onPress={handleFocus}
      className={`mb-4 box-border flex flex-row items-center justify-between rounded-xl border border-disabled bg-white px-5 py-4 ${
        isActive ? 'border-sub1' : 'border-disabled'
      }`}
    >
      <View className="flex flex-col">
        <Text
          className={`text-xs font-semibold leading-[17px] tracking-tight ${
            isFocused ? 'text-main1' : 'text-colorFont'
          }`}
        >
          {title}
        </Text>
        <TextInput
          placeholder={placeholder}
          onBlur={handleBlur}
          value={value}
          onChangeText={setValue}
          className="mt-1.5 pb-[3px] text-sm font-medium text-basicFont"
        />
      </View>

      {value && (
        <Pressable className="rounded-full bg-colorBox px-4 py-2" onPress={buttonFunc}>
          <Text className="text-xs font-medium text-main1">{buttonString}</Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default ButtonTextInput;
