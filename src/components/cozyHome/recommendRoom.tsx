import React from 'react';
import { Text, View, Pressable, Dimensions, LayoutChangeEvent } from 'react-native';

import { getRoomLifeStyleIcon } from '@utils/getLifeStyleIcon';

interface RecommendRoomProps {
  room: {
    roomId: number;
    name: string;
    hashtags: string[];
    equality: number | undefined;
    numOfArrival: number;
    maxMateNum: number;
    preferenceMatchCountList: {
      preferenceName: string;
      count: number;
    }[];
  };
  onLayout?: (event: LayoutChangeEvent) => void;
  pressFunc: (roomId: number) => void;
}

const RecommendRoom: React.FC<RecommendRoomProps> = ({ room, onLayout, pressFunc }) => {
  const screenWidth = Dimensions.get('window').width;
  const calculatedWidth = screenWidth - 40;

  return (
    <Pressable
      onPress={() => pressFunc(room.roomId)}
      style={{ width: calculatedWidth }}
      className="flex flex-col rounded-xl border border-disabled px-4 pb-[18px] pt-5"
      onLayout={onLayout}
    >
      <View className="flex flex-row items-center justify-between border-b border-b-[#F6F6F6] pb-4">
        <Text className="pl-2 text-base font-semibold text-basicFont">{room.name}</Text>
        <Text className="text-base font-medium text-main1">
          {room.equality !== null ? room.equality : '?? '}%
        </Text>
      </View>

      <View className="mb-6 flex flex-row items-center justify-between px-2 pt-4">
        {room.preferenceMatchCountList !== null &&
          room.preferenceMatchCountList.map((preference, index) => (
            <View key={index} className="flex w-[50px] flex-col items-center">
              {getRoomLifeStyleIcon(
                preference.preferenceName,
                preference.count === room.numOfArrival
                  ? 'blue'
                  : preference.count === 0
                  ? 'red'
                  : 'white',
                preference.count === room.numOfArrival
                  ? '모두 일치'
                  : preference.count !== null
                  ? `${preference.count}명 일치`
                  : '??',
              )}
            </View>
          ))}
      </View>

      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row">
          {room.hashtags.map((hash, index) => (
            <View key={index} className="mr-1.5 rounded bg-colorBox px-2 py-0.5">
              <Text className="text-xs font-medium text-colorFont">#{hash}</Text>
            </View>
          ))}
        </View>

        <View className="flex flex-row items-center">
          <Text className="text-xs font-medium text-disabledFont">
            {room.numOfArrival} / {room.maxMateNum}명
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default RecommendRoom;
