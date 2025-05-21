import { Text, TextInput, View } from 'react-native';

interface InputComponentProps {
  title: string;
  value: string;
  setValue: any;
  placeholder: string;
}

const InputComponent: React.FC<InputComponentProps> = ({ title, value, setValue, placeholder }) => {
  return (
    <View className="gap-y-[4px]">
      <Text className="text-18 font-600 leading-18 text-emphasizedFont px-[4px] py-[8px]">
        {title}
      </Text>

      <TextInput
        value={value}
        onChangeText={(e: string) => setValue(e)}
        placeholder={placeholder}
        placeholderTextColor={'#ACADB4'}
        className="p-[16px] bg-colorBox rounded-xl"
        autoCapitalize="none"
      />
    </View>
  );
};

export default InputComponent;
