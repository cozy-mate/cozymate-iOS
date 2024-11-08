import React from 'react';
import { Text, View, Pressable, Dimensions, LayoutChangeEvent } from 'react-native';

import {
  lifestyleOptions,
  LifestyleOptionKey,
  getRoommateLifeStyleIcon,
} from '@utils/getLifeStyleIcon';

interface SameAnswerUserComponentProps {
  userData: {
    memberId: number;
    memberNickName: string;
    equality: number;
    preferenceStats: Record<string, string | number>;
  };
  onLayout?: (event: LayoutChangeEvent) => void;
  pressFunc: () => void;
}

const SameAnswerUserComponent: React.FC<SameAnswerUserComponentProps> = ({
  userData,
  onLayout,
  pressFunc,
}) => {
  const isLifestyleOptionKey = (key: string): key is LifestyleOptionKey => {
    return key in lifestyleOptions;
  };

  const screenWidth = Dimensions.get('window').width;
  const calculatedWidth = screenWidth - 40;

  return (
    <Pressable
      onPress={pressFunc}
      style={{ width: calculatedWidth }}
      className="flex flex-col rounded-xl border border-disabled px-4 py-5"
      onLayout={onLayout}
    >
      <View className="flex flex-row items-center justify-between border-b border-b-[#F6F6F6] pb-3">
        <Text className="pl-2 text-base font-semibold text-basicFont">
          {userData.memberNickName}
        </Text>
        <View className="flex flex-row items-center">
          <Text className="mr-1 text-xs font-medium text-disabledFont">
            내 라이프스타일과 일치율
          </Text>
          <Text className="text-base font-medium text-main1">{userData.equality}%</Text>
        </View>
      </View>

      <View className="flex flex-row items-center justify-between px-2 pt-3">
        {Object.entries(userData.preferenceStats).map(([key, value], index) => (
          <View key={index} className="flex w-[60px] flex-col items-center">
            {isLifestyleOptionKey(key) ? getRoommateLifeStyleIcon(key, value) : null}
          </View>
        ))}
      </View>
    </Pressable>
  );
};

export default SameAnswerUserComponent;
