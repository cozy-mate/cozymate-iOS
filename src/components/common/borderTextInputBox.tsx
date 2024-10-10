import React, { useState } from 'react';
import { Text, View, TextInput, Pressable } from 'react-native';

interface BorderTextInputBoxProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  hasButton: boolean;
  buttonString?: string;
  pressFunc?: () => void;
  canUse?: boolean;
}

const BorderTextInputBox: React.FC<BorderTextInputBoxProps> = ({
  title,
  value,
  setValue,
  placeholder,
  hasButton,
  buttonString,
  pressFunc,
  canUse = true,
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
      className={`mb-4 box-border flex flex-row items-center justify-between rounded-xl border bg-white px-5 py-4
        ${!canUse ? 'border-warning' : isActive ? 'border-sub1' : 'border-disabled'}`}
    >
      <View className="flex flex-col items-start justify-center">
        <Text
          className={`text-xs font-semibold leading-[17px] tracking-tight
            ${!canUse ? 'text-warning' : isFocused ? 'text-main1' : 'text-colorFont'}`}
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
            className="text-sm font-medium leading-[17px] tracking-tight text-basicFont"
          />
        </View>
      </View>

      {value && hasButton && (
        <Pressable className="flex items-center" onPress={value ? pressFunc : undefined}>
          <View className="rounded-xl bg-colorBox px-4 py-2">
            <Text className="text-xs font-medium text-main1">{buttonString}</Text>
          </View>
        </Pressable>
      )}
    </Pressable>
  );
};

export default BorderTextInputBox;
