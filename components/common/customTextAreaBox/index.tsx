import { Text, TextInput, View } from 'react-native';

interface CustomTextareeComponentProps {
  title: string;
  value: string;
  handleValue: (e: string) => void;
  placeholder: string;
}

const CustomTextareaComponent: React.FC<CustomTextareeComponentProps> = ({
  title,
  value,
  handleValue,
  placeholder,
}) => {
  return (
    <View className="gap-y-[8px]">
      <Text className="text-16 font-600 text-basicFont px-1">{title}</Text>
      <TextInput
        multiline
        value={value}
        onChangeText={handleValue}
        placeholder={placeholder}
        className="rounded-xl bg-colorBox p-4 text-14 font-500 text-basicFont h-[258px]"
      />
    </View>
  );
};

export default CustomTextareaComponent;
