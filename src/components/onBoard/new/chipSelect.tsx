import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';

import { LifestyleOptionKey } from '@utils/getLifeStyleIcon';

interface ChipSelectComponentProps {
  preference: LifestyleOptionKey[];
  handlePreference: (item: LifestyleOptionKey) => void;
}

type Item = {
  index: number;
  value: LifestyleOptionKey;
  name: string;
};

const ChipSelectComponent: React.FC<ChipSelectComponentProps> = ({
  preference,
  handlePreference,
}) => {
  const [items] = useState<Item[]>([
    { index: 1, value: 'birthYear', name: '출생년도' },
    { index: 2, value: 'admissionYear', name: '학번' },
    { index: 3, value: 'majorName', name: '학과' },
    { index: 4, value: 'acceptance', name: '합격여부' },
    { index: 5, value: 'wakeUpTime', name: '기상시간' },
    { index: 6, value: 'sleepingTime', name: '취침시간' },
    { index: 7, value: 'turnOffTime', name: '소등시간' },
    { index: 8, value: 'smoking', name: '흡연여부' },
    { index: 9, value: 'sleepingHabit', name: '잠버릇' },
    { index: 10, value: 'airConditioningIntensity', name: '에어컨' },
    { index: 11, value: 'heatingIntensity', name: '히터' },
    { index: 12, value: 'lifePattern', name: '생활패턴' },
    { index: 13, value: 'intimacy', name: '친밀도' },
    { index: 14, value: 'canShare', name: '물건공유' },
    { index: 15, value: 'isPlayGame', name: '게임여부' },
    { index: 16, value: 'isPhoneCall', name: '전화여부' },
    { index: 17, value: 'studying', name: '공부여부' },
    { index: 18, value: 'intake', name: '섭취여부' },
    { index: 19, value: 'cleanSensitivity', name: '청결예민도' },
    { index: 20, value: 'noiseSensitivity', name: '소음예민도' },
    { index: 21, value: 'cleaningFrequency', name: '청소빈도' },
    { index: 22, value: 'drinkingFrequency', name: '음주빈도' },
    { index: 23, value: 'personality', name: '성격' },
    { index: 24, value: 'mbti', name: 'MBTI' },
  ]);

  return (
    <View className="flex flex-row flex-wrap gap-x-2 gap-y-3 px-5">
      {items.map((item) => (
        <Pressable
          key={item.index}
          onPress={() => handlePreference(item.value)}
          className={`rounded-full px-3.5 py-2 ${
            preference.includes(item.value)
              ? 'border border-main1 bg-[#CADFFF]'
              : 'bg-white shadow-chipback'
          }`}
        >
          <Text
            className={`text-sm ${
              preference.includes(item.value)
                ? 'font-semibold text-main1'
                : 'font-medium text-disabledFont'
            } `}
          >
            {item.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default ChipSelectComponent;
