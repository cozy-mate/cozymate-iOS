import { useRef, useState } from 'react';
import { TextInput, View, Text, Pressable } from 'react-native';

import BorderContainer from './borderContainer';

interface BorderButtonBoxProps {
  title: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  buttonText: string;
  buttonDisabled?: boolean;
  onButtonPress: () => void;
  isError?: boolean;
  errorText?: string;
  successText?: string;
}

const BorderButtonBox: React.FC<BorderButtonBoxProps> = ({
  title,
  value,
  placeholder,
  onChangeText,
  buttonText,
  buttonDisabled,
  onButtonPress,
  isError,
  errorText,
  successText,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);

  return (
    <View className="gap-y-[4px]">
      <Pressable onPress={() => inputRef.current?.focus()}>
        <BorderContainer isError={isError} isFocused={isFocused}>
          <View className="flex-1 mr-[4px]">
            <Text className={`Semibold12 ${isError ? 'text-warningColor' : 'text-colorFont'}`}>
              {title}
            </Text>
            <TextInput
              ref={inputRef}
              value={value}
              onChangeText={onChangeText}
              className="InputMedium14 text-basicFont mt-[6px]"
              placeholder={placeholder}
              placeholderTextColor="#ACADB4"
              autoCapitalize="none"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>

          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              onButtonPress();
            }}
            disabled={buttonDisabled}
            className={`px-[16px] py-[8px] rounded-[26px] ${buttonDisabled ? 'bg-boxColor' : 'bg-colorBox'}`}
          >
            <Text
              className={`Semibold12 ${buttonDisabled ? 'text-disabledFont' : 'text-mainColor'}`}
            >
              {buttonText}
            </Text>
          </Pressable>
        </BorderContainer>
      </Pressable>

      {isError && <Text className="Medium12 text-warningColor mx-[8px]">{errorText}</Text>}
      {!isError && !!successText && (
        <Text className="Medium12 text-mainColor mx-[8px]">{successText}</Text>
      )}
    </View>
  );
};

export default BorderButtonBox;
