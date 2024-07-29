import React, { useState } from 'react';
import { Text, View, TextInput, Pressable } from 'react-native';

interface TextInputBoxComponentProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  hasButton: boolean;
  buttonString?: string;
  pressFunc?: () => void;
}

const TextInputBoxComponent: React.FC<TextInputBoxComponentProps> = ({
  title,
  value,
  setValue,
  placeholder,
  hasButton,
  buttonString,
  pressFunc,
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

  const isActive = isFocused || value !== '';

  return (
    <Pressable
      onPress={handleFocus}
      className={`box-border flex flex-row justify-between items-center rounded-xl border-[1px] px-5 py-4 mb-4 bg-white
        ${isActive ? 'border-sub1' : 'border-disabled'}`}
    >
      <View className="flex flex-col items-start justify-center">
        <Text
          className={`font-semibold text-xs leading-[17px] tracking-[-0.03em]
            ${isFocused ? 'text-main1' : 'text-colorFont'}`}
        >
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
            placeholderTextColor="#ACADB4"
            className="font-medium text-sm leading-[17px] tracking-[-0.03em] text-basicFont"
          />
        </View>
      </View>

      {value && hasButton && (
        <Pressable className="flex items-center" onPress={value ? pressFunc : undefined}>
          <View className="px-4 py-2 bg-colorBox rounded-xl">
            <Text className="text-xs font-medium text-main1">{buttonString}</Text>
          </View>
        </Pressable>
      )}
    </Pressable>
  );
};

export default TextInputBoxComponent;
