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

  const isActive = isFocused || !!value;

  return (
    <Pressable
      onPress={handleFocus}
      className={
        isActive
          ? 'flex-row justify-between rounded-xl border-2 border-main px-[22px] py-4 mb-4'
          : 'flex-row justify-between rounded-xl border-2 border-[#E2E2E2] px-[22px] py-4 mb-4'
      }
    >
      <View>
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
            className="mr-2 font-semibold"
          />
        </View>
      </View>

      {hasButton && (
        <Pressable className="flex-row items-center" onPress={value ? pressFunc : undefined}>
          <View className="bg-[#F3F6FA] rounded-xl px-4 py-2">
            <Text className="text-xs text-main font-medium">{buttonString}</Text>
          </View>
        </Pressable>
      )}
    </Pressable>
  );
};

export default TextInputBoxComponent;
