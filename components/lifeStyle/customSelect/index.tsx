import { Pressable, Text, View } from 'react-native';

interface CustomSelectComponentProps {
  title: string;
  value: string[] | undefined;
  items: {
    index: number;
    title: string;
    value: string;
  }[];
  handleValue: (value: string[]) => void;
}

const CustomSelectComponent: React.FC<CustomSelectComponentProps> = ({
  title,
  value,
  items,
  handleValue,
}) => {
  const checkedValue = value ?? [];

  const toggleSelection = (itemValue: string) => {
    const updatedValue = checkedValue.includes(itemValue)
      ? checkedValue.filter((v) => v !== itemValue)
      : [...checkedValue, itemValue];
    handleValue(updatedValue);
  };

  return (
    <View className="gap-y-2">
      <Text className="text-16 font-600 text-emphasizedFont mx-1">{title}</Text>

      <View className="flex flex-row flex-wrap gap-2">
        {items.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => toggleSelection(item.value)}
            className={`px-[20px] py-[10px] rounded-md ${checkedValue.includes(item.value) ? 'bg-subColor1' : 'bg-colorBox'}`}
          >
            <Text
              className={`text-14 leading-14 ${checkedValue.includes(item.value) ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
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
