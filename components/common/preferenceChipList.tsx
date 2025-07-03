import { Pressable, StyleSheet, Text, View } from 'react-native';

import { lifeStyleItems, LifeStyleValue } from '@/constants/items/lifeStyle';

interface PreferenceChipListComponentProps {
  value: string[];
  handleValue: (e: LifeStyleValue) => void;
}

const PreferenceChipListComponent: React.FC<PreferenceChipListComponentProps> = ({
  value,
  handleValue,
}) => {
  return (
    <View className="flex flex-row flex-wrap gap-x-[8px] gap-y-[12px]">
      {lifeStyleItems.map((lifeStyle, index) => (
        <Pressable
          key={index}
          onPress={() => handleValue(lifeStyle.value)}
          style={!value.includes(lifeStyle.value) && styles.chipback}
          className={`px-[14px] py-[8px] rounded-full border ${value.includes(lifeStyle.value) ? 'border-mainColor bg-subColor1' : 'border-transparent bg-white'}`}
        >
          <Text
            className={`${value.includes(lifeStyle.value) ? 'Semibold14 text-mainColor' : 'Medium14 text-disabledFont'}`}
          >
            {lifeStyle.title}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default PreferenceChipListComponent;

const styles = StyleSheet.create({
  chipback: {
    shadowColor: 'rgba(107, 107, 107, 0.25)', // 그림자 색
    shadowOffset: { width: 0, height: 0 }, // 그림자의 방향 (X, Y)
    shadowOpacity: 1, // 그림자의 불투명도
    shadowRadius: 1, // 그림자의 흐림 정도
  },
});
