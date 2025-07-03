import { useState } from 'react';
import { TextInput, Text, View } from 'react-native';

interface CustomNumberPadProps {
  title: string;
  value: string | undefined;
  handleValue: (e: string) => void;
  placeholder: string;
  maxLength?: number;
}

const CustomNumberPad: React.FC<CustomNumberPadProps> = ({
  title,
  value,
  handleValue,
  placeholder,
  maxLength = 2,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <View className="gap-y-[4px]">
      <View className="gap-y-[12px]">
        <Text
          className={`Semibold16 ${isFocused ? 'text-mainColor' : 'text-emphasizedFont'} mx-[4px]`}
        >
          {title}
        </Text>

        <TextInput
          value={value}
          onChangeText={handleValue}
          placeholder={placeholder}
          placeholderTextColor={'#ACADB4'}
          className={`px-[16px] py-[15px] rounded-xl InputMedium14 text-basicFont h-[49px] border ${isFocused ? 'bg-subColor2 border-mainColor' : 'bg-colorBox border-colorBox'}`}
          keyboardType="number-pad"
          maxLength={maxLength}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </View>
    </View>
  );
};

export default CustomNumberPad;
