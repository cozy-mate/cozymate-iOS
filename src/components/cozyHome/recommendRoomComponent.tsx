import React from 'react';
import { Text, View, Dimensions, LayoutChangeEvent } from 'react-native';

import {
  lifestyleOptions,
  LifestyleOptionKey,
  getRoomLifeStyleIcon,
} from '@utils/getLifeStyleIcon';

interface RecommendRoomComponentProps {
  roomData: {
    title: string;
    equality: number;
    currentNum: number;
    totalNum: number;
    hashTags: string[];
    option: {
      title: string;
      color: string;
      answer: string;
    }[];
  };
  onLayout: (event: LayoutChangeEvent) => void;
}

const RecommendRoomComponent: React.FC<RecommendRoomComponentProps> = ({ roomData, onLayout }) => {
  const isLifestyleOptionKey = (key: string): key is LifestyleOptionKey => {
    return key in lifestyleOptions;
  };

  const screenWidth = Dimensions.get('window').width;
  const calculatedWidth = screenWidth - 40;

  return (
    <View
      style={{ width: calculatedWidth }}
      className="flex flex-col rounded-xl border border-disabled px-4 pb-[18px] pt-5"
      onLayout={onLayout}
    >
      <View className="flex flex-row items-center justify-between border-b border-b-[#F6F6F6] pb-4">
        <Text className="pl-2 text-base font-semibold text-basicFont">{roomData.title}</Text>
        <View className="flex flex-row items-center">
          <Text className="mr-1 text-xs font-medium text-disabledFont">방 평균 일치율</Text>
          <Text className="text-base font-medium text-main1">{roomData.equality}%</Text>
        </View>
      </View>

      <View
        className={`mb-6 flex flex-row items-center px-2 pt-4 ${roomData.option.length == 2 ? 'justify-around' : 'justify-between'}`}
      >
        {roomData.option.map((opt, index) => (
          <View key={index} className="flex flex-col items-center">
            {isLifestyleOptionKey(opt.title)
              ? getRoomLifeStyleIcon(opt.title, opt.color, opt.answer)
              : null}
          </View>
        ))}
      </View>

      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row">
          {roomData.hashTags.map((hash, index) => (
            <View key={index} className="mr-1.5 rounded bg-colorBox px-2 py-0.5">
              <Text className="text-xs font-medium text-colorFont">#{hash}</Text>
            </View>
          ))}
        </View>

        <View className="flex flex-row items-center">
          <Text className="text-xs font-medium text-disabledFont">
            {roomData.currentNum} / {roomData.totalNum}명
          </Text>
        </View>
      </View>
    </View>
  );
};

export default RecommendRoomComponent;
