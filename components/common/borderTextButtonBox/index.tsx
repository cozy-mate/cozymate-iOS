import React, { useRef, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

interface BorderTextButtonBoxProps {
  title: string;
  value: string;
  handleValue: (value: string) => void;
  placeholder: string;
  buttonText: string;
  buttonPress: () => void;
  canPress: boolean;
  errorMessage?: string;
}

const BorderTextButtonBox: React.FC<BorderTextButtonBoxProps> = ({
  title,
  value,
  handleValue,
  placeholder,
  buttonText,
  buttonPress,
  canPress,
  errorMessage,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  const [isError, setIsError] = useState<boolean>(false);

  const handleError = async () => {
    try {
      await buttonPress();

      setIsError(false);
    } catch (error: any) {
      console.log(error);
      setIsError(true);
    }
  };

  return (
    <View className="gap-y-[8px]">
      <Pressable
        onPress={() => inputRef.current?.focus()}
        className={`border ${isError ? 'border-warningColor' : isFocused || value !== '' ? 'border-subColor1' : 'border-disabledColor'} rounded-xl p-5 h-[80px] flex flex-row justify-between items-center`}
      >
        <View className="gap-y-1.5">
          <Text
            className={`text-12 font-600 leading-12 ${isError ? 'text-warningColor' : 'text-colorFont'}`}
          >
            {title}
          </Text>
          <TextInput
            ref={inputRef}
            value={value}
            onChangeText={handleValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            placeholderTextColor={'#ACADB4'}
            className="text-14 font-500 text-basicFont"
            autoCapitalize="none"
          />
        </View>

        <Pressable
          onPress={(event) => {
            event.stopPropagation();
            handleError();
          }}
          disabled={!canPress}
          className={`px-[16px] py-[8px] rounded-[26px] ${canPress ? 'bg-colorBox' : 'bg-boxColor'} `}
        >
          <Text
            className={`text-12 font-600 leading-12 ${canPress ? 'text-mainColor' : 'text-disabledFont'}`}
          >
            {buttonText}
          </Text>
        </Pressable>
      </Pressable>

      {isError && (
        <Text className="text-12 font-500 leading-12 text-warningColor mx-[8px]">
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default BorderTextButtonBox;
