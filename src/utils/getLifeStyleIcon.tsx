import React, { Fragment } from 'react';
import { Text, View } from 'react-native';

import WakeUpTime from '@assets/lifeStyleIcon/wakeUpTime.svg';
import SleepingTime from '@assets/lifeStyleIcon/sleepingTime.svg';
import CleanSensitivity from '@assets/lifeStyleIcon/cleanSensitivity.svg';
import NoiseSensitivity from '@assets/lifeStyleIcon/noiseSensitivity.svg';

export const getLifeStyleIcon = (option: string, answer: string) => {
  if (option == 'wakeUpTime') {
    return (
      <View className="flex flex-col items-center">
        <WakeUpTime />
        <Text className="mt-1.5 text-xs font-medium text-disabledFont">기상시간</Text>
        <Text className="text-xs font-semibold text-basicFont">{answer}</Text>
      </View>
    );
  } else if (option == 'sleepingTime') {
    return (
      <View className="flex flex-col items-center">
        <SleepingTime />
        <Text className="mt-1.5 text-xs font-medium text-disabledFont">취침시간</Text>
        <Text className="text-xs font-semibold text-basicFont">{answer}</Text>
      </View>
    );
  } else if (option == 'cleanSensitivity') {
    return (
      <View className="flex flex-col items-center">
        <CleanSensitivity />
        <Text className="mt-1.5 text-xs font-medium text-disabledFont">청결예민도</Text>
        <Text className="text-xs font-semibold text-basicFont">{answer}</Text>
      </View>
    );
  } else if (option == 'noiseSensitivity') {
    return (
      <View className="flex flex-col items-center">
        <NoiseSensitivity />
        <Text className="mt-1.5 text-xs font-medium text-disabledFont">소음예민도</Text>
        <Text className="text-xs font-semibold text-basicFont">{answer}</Text>
      </View>
    );
  } else {
    return (
      <View className="flex flex-col items-center">
        <SleepingTime />
        <Text className="mt-1.5 text-xs font-medium text-disabledFont">기상시간</Text>
        <Text className="text-xs font-semibold text-basicFont">{answer}</Text>
      </View>
    );
  }
};
