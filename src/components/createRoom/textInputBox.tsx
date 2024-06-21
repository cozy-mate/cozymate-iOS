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

  return (
    <View>
      <Text className="pl-1 mb-2 font-semibold text-basicFont">{title}</Text>
      <Pressable
        onPress={handleFocus}
        className="flex-row justify-between rounded-xl bg-[#F6F7F9] px-4 py-[18px]"
      >
        <View className="flex-row">
          <TextInput
            ref={inputRef}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChangeText={valueHandleChange}
            placeholder={placeholder}
            placeholderTextColor="#ACADB4"
            className="text-sm font-medium "
          />
        </View>

        {hasButton && (
          <Pressable className="flex-row items-center" onPress={value ? pressFunc : undefined}>
            <View className="px-4 py-2 bg-colorBox rounded-xl">
              <Text className="text-xs font-medium text-main">{buttonString}</Text>
            </View>
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

export default TextInputBoxComponent;
