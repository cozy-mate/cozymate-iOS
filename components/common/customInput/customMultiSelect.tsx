import { Pressable, Text, View } from 'react-native';

interface CustomMultiSelectProps {
  title: string;
  value: string[] | undefined;
  handleValue: (e: string[]) => void;
  items: {
    index: number;
    title: string;
    value: string;
  }[];
}

const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
  title,
  value,
  handleValue,
  items,
}) => {
  const checkedValue = value ?? [];

  const toggleSelection = (itemValue: string) => {
    const updatedValue = checkedValue.includes(itemValue)
      ? checkedValue.filter((v) => v !== itemValue)
      : [...checkedValue, itemValue];
    handleValue(updatedValue);
  };

  return (
    <View className="gap-y-[12px]">
      <Text className="Semibold16 text-emphasizedFont mx-[4px]">{title}</Text>

      <View className="flex flex-row flex-wrap gap-[8px]">
        {items.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => toggleSelection(item.value)}
            className={`px-[20px] py-[10px] rounded-md ${checkedValue.includes(item.value) ? 'bg-subColor1' : 'bg-colorBox'}`}
          >
            <Text
              className={`${checkedValue.includes(item.value) ? 'Semibold14 text-mainColor' : 'Medium14 text-disabledFont'}`}
            >
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default CustomMultiSelect;
