import { Text, TextInput, View } from 'react-native';

interface CustomTextareaProps {
  title?: string;
  additionalTitle?: string;
  value: string;
  handleValue: (e: string) => void;
  placeholder: string;
  height: string;
  maxLength?: number;
  onFocus?: any;
  onBlur?: any;
}

const CustomTextarea: React.FC<CustomTextareaProps> = ({
  title,
  additionalTitle,
  value,
  handleValue,
  placeholder,
  height,
  maxLength = 200,
  onFocus,
  onBlur,
}) => {
  return (
    <View className="gap-y-[4px]">
      <View className="gap-y-[12px]">
        {title !== undefined && (
          <Text className="Semibold16 text-emphasizedFont mx-[4px]">
            {title}
            <Text className="text-disabledFont">{additionalTitle}</Text>
          </Text>
        )}

        <TextInput
          value={value}
          onChangeText={handleValue}
          placeholder={placeholder}
          placeholderTextColor={'#ACADB4'}
          className={`${height} p-[16px] rounded-xl InputMedium14 text-basicFont border ${value.length > maxLength ? 'border-warningColor bg-[#FFDDDD]' : 'border-colorBox bg-colorBox'}`}
          autoCapitalize="none"
          multiline={true}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </View>
      <Text
        className={`Medium12 mx-[8px] self-end ${value.length > maxLength ? 'text-warningColor' : 'text-disabledFont'}`}
      >
        {value.length > maxLength && `${maxLength}자 이상 입력할 수 없어요:`} {value.length} /{' '}
        {maxLength}자
      </Text>
    </View>
  );
};

export default CustomTextarea;
