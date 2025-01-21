import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { RegisterLifeStyle } from '@zustand/member-stat/type';
import { useNewLifeStyleStore } from '@zustand/member-stat/member-stat';

type NumberItem = {
  index: number;
  value: number;
  name: string;
};

interface TimeRadioComponentProps {
  title: string;
  items: NumberItem[];
  value: keyof RegisterLifeStyle;
  meridian: keyof RegisterLifeStyle;
  showNext?: React.Dispatch<React.SetStateAction<boolean>>;
}

const TimeRadioComponent: React.FC<TimeRadioComponentProps> = ({
  title,
  items,
  value,
  meridian,
  showNext,
}) => {
  const { lifeStyle, setNewLifeStyle } = useNewLifeStyleStore();

  const handleValue = (item: NumberItem) => {
    setNewLifeStyle({ [value]: item.value });

    if (showNext && lifeStyle[meridian] !== '') {
      showNext(true);
    }
  };

  const handleMeridian = (text: string) => {
    setNewLifeStyle({ [meridian]: text });

    if (showNext && lifeStyle[value] !== undefined) {
      showNext(true);
    }
  };

  return (
    <View className="space-y-2">
      <View className="space-y-1">
        <Text className="text-base font-semibold text-emphasizedFont">{title}</Text>
        <View className="flex flex-row items-center">
          <Pressable onPress={() => handleMeridian('오전')} className="p-2">
            <Text
              className={`text-sm ${
                lifeStyle[meridian] === '오전'
                  ? 'font-semibold text-main1'
                  : 'font-medium text-disabledFont'
              }`}
            >
              AM
            </Text>
          </Pressable>
          <View className="mx-2 h-4 w-[1px] bg-[#D9D9D9]" />
          <Pressable onPress={() => handleMeridian('오후')} className="p-2">
            <Text
              className={`text-sm ${
                lifeStyle[meridian] === '오후'
                  ? 'font-semibold text-main1'
                  : 'font-medium text-disabledFont'
              }`}
            >
              PM
            </Text>
          </Pressable>
        </View>
      </View>
      <View className="flex flex-row flex-wrap gap-2">
        {items.map((item) => (
          <Pressable
            key={item.index}
            onPress={() => handleValue(item)}
            className={`w-12 rounded-md px-4 py-2.5 ${
              lifeStyle[value] === item.value ? 'bg-sub1' : 'bg-colorBox'
            }`}
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

export default TimeRadioComponent;
