import { Pressable, Text, View } from 'react-native';

interface CustomSelectComponentProps {
  title: string;
  value: string | number;
  items: {
    title: string;
    value: string | number;
  }[];
  handleValue: (value: string | number) => void;
}

const CustomSelectComponent: React.FC<CustomSelectComponentProps> = ({
  title,
  value,
  items,
  handleValue,
}) => {
  return (
    <View className="gap-y-[8px]">
      <Text className="text-16 font-600 leading-16 text-basicFont px-[4px]">{title}</Text>

      <View className="flex flex-row flex-wrap gap-[8px]">
        {items.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => handleValue(item.value)}
            className={`px-[19.8px] py-[10px] rounded-md ${value === item.value ? 'bg-subColor1' : 'bg-colorBox'}`}
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

export default CustomSelectComponent;
