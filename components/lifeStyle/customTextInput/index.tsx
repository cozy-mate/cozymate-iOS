import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

interface CustomTextInputComponentProps {
  title: string;
  value: string;
  handleValue: (value: string) => void;
  placeholder: string;
  isNumber?: boolean;
}

const CustomTextInputComponent: React.FC<CustomTextInputComponentProps> = ({
  title,
  value,
  handleValue,
  placeholder,
  isNumber = false,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <View className="gap-y-2">
      <Text
        className={`text-16 font-600 ${isFocused ? 'text-mainColor' : 'text-emphasizedFont'} mx-1`}
      >
        {title}
      </Text>
      <TextInput
        value={value}
        onChangeText={handleValue}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`p-4 border ${isFocused ? 'bg-subColor2 border-mainColor' : 'bg-colorBox border-colorBox'} rounded-xl text-14 font-500 leading-14 text-basicFont`}
        keyboardType={isNumber ? 'number-pad' : 'default'}
      />
    </View>
  );
};

export default CustomTextInputComponent;
