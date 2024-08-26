import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';

interface CustomTextInputBoxProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  isDisable?: boolean;
  enterFunc?: () => void;
}

const CustomTextInputBox: React.FC<CustomTextInputBoxProps> = ({
  title,
  value,
  setValue,
  placeholder,
  isDisable,
  enterFunc,
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

  const handleSubmitEditing = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    if (enterFunc && value) {
      enterFunc();
    }
    inputRef.current?.blur();
  };

  return (
    <View className="mb-12">
      <Text
        className={`${
          isFocused ? 'text-main1' : 'text-emphasizedFont'
        } text-lg font-semibold px-1 mb-2`}
      >
        {title}
      </Text>
      <Pressable onPress={handleFocus}>
        <TextInput
          ref={inputRef}
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={valueHandleChange}
          onSubmitEditing={handleSubmitEditing}
          placeholder={placeholder}
          editable={isDisable}
          blurOnSubmit={false}
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
