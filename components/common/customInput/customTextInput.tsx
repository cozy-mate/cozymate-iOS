import { TextInput, Text, View } from 'react-native';

interface CustomTextInputProps {
  title: string;
  value: string;
  handleValue: (e: string) => void;
  placeholder: string;
  maxLength?: number;
  errorText?: string;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  title,
  value,
  handleValue,
  placeholder,
  maxLength,
  errorText,
}) => {
  return (
    <View className="gap-y-[4px]">
      <View className="gap-y-[12px]">
        <Text className="Semibold16 text-emphasizedFont mx-[4px]">{title}</Text>

        <TextInput
          value={value}
          onChangeText={handleValue}
          placeholder={placeholder}
          placeholderTextColor={'#ACADB4'}
          className={`px-[16px] py-[15px] rounded-xl InputMedium14 text-basicFont h-[49px] border ${maxLength !== undefined && value.length > maxLength ? 'border-warningColor bg-[#FFDDDD]' : 'border-colorBox bg-colorBox'}`}
        />
      </View>

      {maxLength !== undefined && (
        <Text
          className={`Medium12 mx-[8px] self-end ${value.length > maxLength ? 'text-warningColor' : 'text-disabledFont'}`}
        >
          {value.length > maxLength && `${maxLength}자 이상 입력할 수 없어요:`} {value.length} /{' '}
          {maxLength}자
        </Text>
      )}

      {errorText !== undefined && errorText !== '' && (
        <Text className="Medium12 text-warningColor mx-[8px]">{errorText}</Text>
      )}
    </View>
  );
};

export default CustomTextInput;
