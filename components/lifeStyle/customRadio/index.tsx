import { Pressable, Text, View } from 'react-native';

interface CustomRadioComponentProps {
  title: string;
  value: string | number | undefined;
  items: {
    index: number;
    title: string;
    value: string | number;
  }[];
  handleValue: (value: string | number | undefined) => void;
}

const CustomRadioComponent: React.FC<CustomRadioComponentProps> = ({
  title,
  value,
  items,
  handleValue,
}) => {
  return (
    <View className="gap-y-2">
      <Text className="text-16 font-600 text-emphasizedFont mx-1">{title}</Text>

      <View className="flex flex-row flex-wrap gap-2">
        {items.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => handleValue(item.value)}
            className={`px-[20px] py-[10px] rounded-md ${value === item.value ? 'bg-subColor1' : 'bg-colorBox'}`}
          >
            <Text
              className={`text-14 leading-14 ${value === item.value ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default CustomRadioComponent;
