import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

interface CustomTextInputBoxProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  isDisable?: boolean;
}

const CustomTextInputBox: React.FC<CustomTextInputBoxProps> = ({
  title,
  value,
  setValue,
  placeholder,
  isDisable,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const inputRef = React.useRef<TextInput>(null);

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

  return (
    <View className="mb-12">
      <Text
        className={`${
          isFocused ? 'text-main1' : 'text-emphasizedFont'
        } text-base font-semibold px-[2px] mb-2`}
      >
        {title} 입력해주세요
      </Text>
      <Pressable onPress={handleFocus}>
        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={valueHandleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          placeholder={`ex. ${placeholder}`}
          editable={isDisable}
          className={`${
            isFocused
              ? 'bg-sub2 border-main1 border-[1px]'
              : 'bg-colorBox border-colorBox border-[1px]'
          } p-4 text-basicFont rounded-xl`}
        />
      </Pressable>
    </View>
  );
};

export default CustomTextInputBox;
