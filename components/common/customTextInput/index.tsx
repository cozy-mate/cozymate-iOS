import { Text, TextInput, View } from 'react-native';

interface CustomTextInputComponentProps {
  title: string;
  value: string;
  handleValue: (e: string) => void;
  placeholder: string;
}

const CustomTextInputComponent: React.FC<CustomTextInputComponentProps> = ({
  title,
  value,
  handleValue,
  placeholder,
}) => {
  return (
    <View className="gap-y-[8px]">
      <Text className="text-16 font-600 text-basicFont px-1">{title}</Text>
      <TextInput
        value={value}
        onChangeText={handleValue}
        placeholder={placeholder}
        className="rounded-xl bg-colorBox p-4 text-14 font-500 text-basicFont"
      />
    </View>
  );
};

export default CustomTextInputComponent;
