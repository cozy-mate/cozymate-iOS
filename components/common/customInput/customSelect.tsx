import { FlatList, Pressable, Text, View } from 'react-native';

interface CustomSelectProps<T extends string | number> {
  title: string;
  value: T;
  handleValue: (e: T) => void;
  items: {
    index: number;
    title: string;
    value: T;
  }[];
  isGrid?: boolean;
}

const CustomSelect = <T extends string | number>({
  title,
  value,
  handleValue,
  items,
  isGrid = false,
}: CustomSelectProps<T>) => {
  return (
    <View className="gap-y-[12px]">
      <Text className="Semibold16 text-emphasizedFont mx-[4px]">{title}</Text>

      {isGrid ? (
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <Pressable
              key={item.index}
              onPress={() => handleValue(item.value)}
              className={`w-[70px] py-[10px] rounded-md ${value === item.value ? 'bg-subColor1' : 'bg-colorBox'}`}
            >
              <Text
                className={`text-center ${value === item.value ? 'Semibold14 text-mainColor' : 'Medium14 text-disabledFont'}`}
              >
                {item.title}
              </Text>
            </Pressable>
          )}
          scrollEnabled={false}
          bounces={false}
          numColumns={4}
          contentContainerStyle={{ gap: 8 }}
          columnWrapperStyle={{ gap: 8 }}
        />
      ) : (
        <View className="flex flex-row flex-wrap gap-[8px]">
          {items.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => handleValue(item.value)}
              className={`px-[20px] py-[10px] rounded-md ${value === item.value ? 'bg-subColor1' : 'bg-colorBox'}`}
            >
              <Text
                className={`${value === item.value ? 'Semibold14 text-mainColor' : 'Medium14 text-disabledFont'}`}
              >
                {item.title}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

export default CustomSelect;
