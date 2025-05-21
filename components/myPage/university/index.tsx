import { Text, TextInput, View } from 'react-native';

interface UniversityComponentProps {
  title: string;
  value: string;
  editable?: boolean;
}

const UniversityComponent: React.FC<UniversityComponentProps> = ({
  title,
  value,
  editable = true,
}) => {
  return (
    <View className="border border-subColor1 px-[20px] pt-[16px] pb-[12px] rounded-xl">
      <Text className="text-12 font-600 leading-12 text-colorFont">{title}</Text>

      <TextInput
        value={value}
        editable={editable}
        className="text-14 font-500 text-basicFont py-[8px]"
      />
    </View>
  );
};

export default UniversityComponent;
