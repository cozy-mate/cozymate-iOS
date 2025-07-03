import { Dispatch, SetStateAction, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

import SmallXButton from '@/assets/images/common/smallXButton.svg';

interface CustomMultiTextInputProps {
  title: string;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  value: string[];
  setValue: (e: string[]) => void;
  handleSubmit: () => void;
  placeholder: string;
}

const CustomMultiTextInput: React.FC<CustomMultiTextInputProps> = ({
  title,
  inputValue,
  setInputValue,
  value,
  setValue,
  handleSubmit,
  placeholder,
}) => {
  const [backgroundColor, setBackgroundColor] = useState<string>('bg-colorBox');
  const [borderColor, setBorderColor] = useState<string>('border-colorBox');

  const onFocus = () => {
    setBackgroundColor('bg-subColor2');
    setBorderColor('border-mainColor');
  };

  const onBlur = () => {
    setBackgroundColor('bg-colorBox');
    setBorderColor('border-colorBox');
  };

  const removeItem = (item: string) => {
    setValue(value.filter((v) => v !== item));
  };

  return (
    <View className="gap-y-[8px]">
      <View className="gap-y-[12px]">
        <Text className="Semibold16 text-emphasizedFont mx-[4px]">{title}</Text>
        <TextInput
          value={inputValue}
          onChangeText={(e: string) => setInputValue(e)}
          placeholder={placeholder}
          placeholderTextColor={'#ACADB4'}
          className={`p-[16px] h-[47px] ${backgroundColor} rounded-xl InputMedium14 text-basicFont border ${borderColor}`}
          onFocus={onFocus}
          onBlur={onBlur}
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
        />
      </View>

      <View className="flex flex-row items-center">
        {value.map((item, index) => (
          <View
            key={index}
            className="flex flex-row items-center rounded-full pl-[14px] pr-[6px] py-[4px] bg-subColor2 border border-mainColor"
          >
            <Text className="Semibold12 text-mainColor">{item}</Text>
            <Pressable onPress={() => removeItem(item)} className="p-[8px]">
              <SmallXButton />
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CustomMultiTextInput;
