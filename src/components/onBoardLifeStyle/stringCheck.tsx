import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { RegisterLifeStyle } from '@zustand/member-stat/type';
import { useNewLifeStyleStore } from '@zustand/member-stat/member-stat';

type StringItem = {
  index: number;
  value: string;
  name: string;
};

interface StringCheckComponentProps {
  title: string;
  items: StringItem[];
  value: keyof RegisterLifeStyle;
  showNext?: React.Dispatch<React.SetStateAction<boolean>>;
}

const StringCheckComponent: React.FC<StringCheckComponentProps> = ({
  title,
  items,
  value,
  showNext,
}) => {
  const { lifeStyle, setNewLifeStyle } = useNewLifeStyleStore();

  const handleValue = (item: StringItem) => {
    // 초기값을 빈 배열로 처리
    const currentSelection = Array.isArray(lifeStyle[value]) ? (lifeStyle[value] as string[]) : [];
    const isSelected = currentSelection.includes(item.value);

    const updatedSelection = isSelected
      ? currentSelection.filter((v) => v !== item.value) // 선택 해제
      : [...currentSelection, item.value]; // 새로 선택

    setNewLifeStyle({ [value]: updatedSelection });

    if (showNext) {
      showNext(true);
    }
  };

  const isSelected = (itemValue: string) =>
    Array.isArray(lifeStyle[value]) && (lifeStyle[value] as string[]).includes(itemValue);

  return (
    <View className="space-y-2">
      <Text className="text-base font-semibold text-emphasizedFont">{title}</Text>
      <View className="flex flex-row flex-wrap gap-2">
        {items.map((item) => (
          <Pressable
            key={item.index}
            onPress={() => handleValue(item)}
            className={`rounded-md px-5 py-2 ${isSelected(item.value) ? 'bg-sub1' : 'bg-colorBox'}`}
          >
            <Text
              className={`text-sm font-medium ${
                isSelected(item.value)
                  ? 'font-semibold text-main1'
                  : 'font-medium text-disabledFont'
              }`}
            >
              {item.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default StringCheckComponent;
