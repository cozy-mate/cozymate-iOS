import { Pressable, Text, TextInput, View } from 'react-native';

import SmallXButton from '@/assets/images/common/smallXButton.svg';

interface CustomMultiTextInputComponentProps {
  title: string;
  value: string;
  handleValue: (e: string) => void;
  handleSubmit: () => void;
  valueList: string[];
  handleRemove: (value: string) => void;
  placeholder: string;
}

const CustomMultiTextInputComponent: React.FC<CustomMultiTextInputComponentProps> = ({
  title,
  value,
  handleValue,
  handleSubmit,
  valueList,
  handleRemove,
  placeholder,
}) => {
  return (
    <View className="gap-y-[8px]">
      <Text className="text-16 font-600 leading-16 text-basicFont px-[4px]">{title}</Text>
      <TextInput
        value={value}
        onChangeText={handleValue}
        placeholder={placeholder}
        onSubmitEditing={handleSubmit}
        onBlur={handleSubmit}
        className="rounded-xl bg-colorBox p-[16px] text-14 font-500 text-basicFont"
      />

      <View className="flex flex-row flex-wrap mt-[8px] gap-[8px]">
        {valueList.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => handleRemove(item)}
            className="bg-subColor2 pl-[14px] pr-[6px] py-[4px] rounded-full border border-mainColor flex flex-row items-center"
          >
            <Text className="text-12 font-600 leading-12 text-mainColor">#{item}</Text>
            <View className="p-[8px]">
              <SmallXButton />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default CustomMultiTextInputComponent;
