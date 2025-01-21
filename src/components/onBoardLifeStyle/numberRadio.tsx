import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { RegisterLifeStyle } from '@zustand/member-stat/type';
import { useNewLifeStyleStore } from '@zustand/member-stat/member-stat';

type NumberItem = {
  index: number;
  value: number;
  name: string;
};

interface NumberRadioComponentProps {
  title: string;
  items: NumberItem[];
  value: keyof RegisterLifeStyle;
  showNext?: React.Dispatch<React.SetStateAction<boolean>>;
}

const NumberRadioComponent: React.FC<NumberRadioComponentProps> = ({
  title,
  items,
  value,
  showNext,
}) => {
  const { lifeStyle, setNewLifeStyle } = useNewLifeStyleStore();

  const handleValue = (item: NumberItem) => {
    setNewLifeStyle({ [value]: item.value });

    if (showNext) {
      showNext(true);
    }
  };

  return (
    <View className="space-y-2">
      <Text className="text-base font-semibold text-emphasizedFont">{title}</Text>
      <View className="flex flex-row flex-wrap gap-2">
        {items.map((item) => (
          <Pressable
            key={item.index}
            onPress={() => handleValue(item)}
            className={`rounded-md px-5 py-2.5 ${
              lifeStyle[value] === item.value ? 'bg-sub1' : 'bg-colorBox'
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                lifeStyle[value] === item.value
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

export default NumberRadioComponent;
