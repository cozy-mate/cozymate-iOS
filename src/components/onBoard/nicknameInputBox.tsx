import React, { useRef, useState } from 'react';
import { Text, View, TextInput, Pressable } from 'react-native';

interface NicknameInputBoxProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  canUse?: boolean;
}

const NicknameInputBox: React.FC<NicknameInputBoxProps> = ({
  title,
  value,
  setValue,
  placeholder,
  canUse = true,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  const valueHandleChange = (text: string) => {
    setValue(text);
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const isCompleted = isFocused || value !== '';

  return (
    <Pressable
      onPress={handleFocus}
      className={`flex flex-row items-center justify-between rounded-xl border bg-white p-5
        ${!canUse ? 'border-warning' : isFocused ? 'border-sub1' : 'border-disabled'}`}
    >
      <View className="flex flex-col justify-center space-y-1.5">
        <Text
          className={`text-xs font-semibold leading-4 tracking-tight
            ${!canUse ? 'text-warning' : isCompleted ? 'text-main1' : 'text-colorFont'}`}
        >
          {title}
        </Text>
        <TextInput
          ref={inputRef}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={valueHandleChange}
          placeholder={placeholder}
          placeholderTextColor="#ACADB4"
          className="text-sm font-medium leading-4 tracking-tight text-basicFont"
        />
      </View>
    </Pressable>
  );
};

export default NicknameInputBox;
