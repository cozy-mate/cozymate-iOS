import React, { useState } from 'react';
import {
  NativeSyntheticEvent,
  Pressable,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';

interface CustomTextareaProps {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  onEnterPress?: () => void;
  height: number;
  maxLength: number;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  title,
  value,
  setValue,
  placeholder,
  onEnterPress,
  height,
  maxLength,
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
    if (value && onEnterPress) {
      onEnterPress();
    }
  };

  const handleSubmitEditing = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    if (onEnterPress && value) {
      onEnterPress();
    }
  };

  return (
    <View className="mb-12">
      <Text className="px-1 mb-2 text-lg font-semibold text-basicFont">{title}</Text>
      <Pressable onPress={handleFocus}>
        <View style={{ position: 'relative' }}>
          <TextInput
            maxLength={maxLength}
            multiline
            ref={inputRef}
            value={value}
            onChangeText={valueHandleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            onSubmitEditing={handleSubmitEditing}
            placeholder={placeholder}
            blurOnSubmit={false}
            className={`${
              isFocused
                ? 'bg-sub2 border-main1 border-[1px]'
                : 'bg-colorBox border-colorBox border-[1px]'
            } p-4 text-basicFont rounded-xl`}
            style={{ height: height }}
          />
          <Text className="absolute text-sm text-gray-500 bottom-4 right-5">
            {`${value.length} / 50`}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CustomTextarea;
