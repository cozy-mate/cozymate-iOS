import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { RegisterLifeStyle } from '@zustand/member-stat/type';
import { useNewLifeStyleStore } from '@zustand/member-stat/member-stat';

type StringItem = {
  index: number;
  value: string;
  name: string;
};

interface StringRadioComponentProps {
  title: string;
  items: StringItem[];
  value: keyof RegisterLifeStyle;
  showNext?: React.Dispatch<React.SetStateAction<boolean>>;
}

const StringRadioComponent: React.FC<StringRadioComponentProps> = ({
  title,
  items,
  value,
  showNext,
}) => {
  const { lifeStyle, setNewLifeStyle } = useNewLifeStyleStore();

  const handleValue = (item: StringItem) => {
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
            } ${value === 'mbti' && 'w-[70px] px-4'}`}
          >
            <Text
              className={`text-center text-sm font-medium tracking-tight ${
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

export default StringRadioComponent;
