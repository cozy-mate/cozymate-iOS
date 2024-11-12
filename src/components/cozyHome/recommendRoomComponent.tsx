import React from 'react';
import { Text, View, Pressable, Dimensions, LayoutChangeEvent } from 'react-native';

import {
  lifestyleOptions,
  LifestyleOptionKey,
  getRoomLifeStyleIcon,
} from '@utils/getLifeStyleIcon';

interface RecommendRoomComponentProps {
  roomData: {
    roomId: number;
    name: string;
    hashtags: string[];
    equality: number;
    numOfArrival: number;
    maxMateNum: number;
    equalMemberStatNum: Record<string, number>;
  };
  onLayout?: (event: LayoutChangeEvent) => void;
  pressFunc: (roomId: number) => void;
}

const RecommendRoomComponent: React.FC<RecommendRoomComponentProps> = ({
  roomData,
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
      onPress={() => pressFunc(roomData.roomId)}
      style={{ width: calculatedWidth }}
      className="flex flex-col rounded-xl border border-disabled px-4 pb-[18px] pt-5"
      onLayout={onLayout}
    >
      <View className="flex flex-row items-center justify-between border-b border-b-[#F6F6F6] pb-4">
        <Text className="pl-2 text-base font-semibold text-basicFont">{roomData.name}</Text>
        <View className="flex flex-row items-center">
          <Text className="mr-1 text-xs font-medium text-disabledFont">방 평균 일치율</Text>
          <Text className="text-base font-medium text-main1">{roomData.equality}%</Text>
        </View>
      </View>

      <View className="mb-6 flex flex-row items-center justify-between px-2 pt-4">
        {Object.entries(roomData.equalMemberStatNum).map(([key, value], index) => (
          <View key={index} className="flex w-[50px] flex-col items-center">
            {isLifestyleOptionKey(key)
              ? getRoomLifeStyleIcon(
                  key,
                  value === roomData.numOfArrival ? 'blue' : value === 0 ? 'red' : 'white',
                  value === roomData.numOfArrival ? '모두 일치' : `${value}명 일치`,
                )
              : null}
          </View>
        ))}
      </View>

      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row">
          {roomData.hashtags.map((hash, index) => (
            <View key={index} className="mr-1.5 rounded bg-colorBox px-2 py-0.5">
              <Text className="text-xs font-medium text-colorFont">#{hash}</Text>
            </View>
          ))}
        </View>

        <View className="flex flex-row items-center">
          <Text className="text-xs font-medium text-disabledFont">
            {roomData.numOfArrival} / {roomData.maxMateNum}명
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default RecommendRoomComponent;
