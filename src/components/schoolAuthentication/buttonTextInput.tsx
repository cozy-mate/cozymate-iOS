import React, { useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';

interface ButtonTextInputProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  buttonString: string;
  buttonFunc: () => void;
  pattern?: string;
}

const ButtonTextInput: React.FC<ButtonTextInputProps> = ({
  title,
  value,
  setValue,
  placeholder,
  buttonString,
  buttonFunc,
  pattern,
}) => {
  const inputRef = React.useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const isActive = isFocused || value !== '';

  const getDomain = (value: string) => {
    const atIndex = value.indexOf('@');
    return atIndex !== -1 ? value.slice(atIndex + 1) : '';
  };

  const isButtonVisible = value && (!pattern || getDomain(value) === pattern);

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

      {isButtonVisible && (
        <Pressable className="rounded-full bg-colorBox px-4 py-2" onPress={buttonFunc}>
          <Text className="text-xs font-medium text-main1">{buttonString}</Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default ButtonTextInput;
