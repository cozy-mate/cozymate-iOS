import { Text, View, Pressable } from 'react-native';

import { lifeStyleItems } from '@/constants/items/lifeStyle';

interface ChipListProps {
  value: string[];
  handleValue: (value: string) => void;
}

const ChipList: React.FC<ChipListProps> = ({ value, handleValue }) => {
  return (
    <View className="flex flex-row flex-wrap gap-x-[8px] gap-y-[12px]">
      {lifeStyleItems.map((lifeStyle, index) => (
        <Pressable key={index} onPress={() => handleValue(lifeStyle.value)}>
          <View
            className={`px-[14px] py-[8px] rounded-full border ${value.includes(lifeStyle.value) ? 'border-mainColor bg-subColor1' : 'border-transparent bg-white'}`}
          >
            <Text
              className={`text-14 leading-14 ${value.includes(lifeStyle.value) ? 'font-600 text-mainColor' : 'font-500 text-disabledFont'}`}
            >
              {lifeStyle.title}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

export default ChipList;
