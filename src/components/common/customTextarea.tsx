import React, { useState } from 'react';
import {
  Text,
  View,
  Pressable,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
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
      <Text className="mb-2 px-1 text-lg font-semibold text-basicFont">{title}</Text>
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
              isFocused ? 'border border-main1 bg-sub2' : 'border border-colorBox bg-colorBox'
            } rounded-xl p-4 text-basicFont`}
            style={{ height: height }}
          />
          <Text className="absolute bottom-4 right-5 text-sm text-gray-500">
            {`${value.length} / 50`}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CustomTextarea;
