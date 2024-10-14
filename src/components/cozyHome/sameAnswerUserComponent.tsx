import React from 'react';
import { Text, View, Dimensions, LayoutChangeEvent } from 'react-native';

import { getLifeStyleIcon } from '@utils/getLifeStyleIcon';

interface SameAnswerUserComponentProps {
  index: number;
  userData: {
    nickname: string;
    equality: number;
    option: {
      title: string;
      answer: string;
    }[];
  };
  onLayout: (event: LayoutChangeEvent) => void;
}

const SameAnswerUserComponent: React.FC<SameAnswerUserComponentProps> = ({
  index,
  userData,
  onLayout,
}) => {
  const screenWidth = Dimensions.get('window').width;
  const calculatedWidth = screenWidth - 40;

  return (
    <View
      style={{ width: calculatedWidth }}
      className="flex flex-col rounded-xl border border-disabled p-4 pt-5"
      onLayout={onLayout}
    >
      <View className="flex flex-row items-center justify-between border-b border-b-[#F6F6F6] pb-3">
        <Text className="pl-2 text-base font-semibold text-basicFont">{userData.nickname}</Text>
        <View className="flex flex-row items-center">
          <Text className="mr-1 text-xs font-medium text-disabledFont">
            내 라이프스타일과 일치율
          </Text>
          <Text className="text-base font-medium text-main1">{userData.equality}%</Text>
        </View>
      </View>

      <View className="flex flex-row items-center justify-between px-2 pt-3">
        {userData.option.map((opt, index) => (
          <View key={index} className="flex flex-col items-center">
            {getLifeStyleIcon(opt.title, opt.answer)}
          </View>
        ))}
      </View>
    </View>
  );
};

export default SameAnswerUserComponent;
