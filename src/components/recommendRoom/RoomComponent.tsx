import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { useHasLifeStyleStore } from '@zustand/member-stat/member-stat';

import { getRoomLifeStyleIcon } from '@utils/getLifeStyleIcon';

interface RoomComponentProps {
  roomData: {
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
  pressFunc: (roomId: number) => void;
}

const RoomComponent: React.FC<RoomComponentProps> = ({ roomData, pressFunc }) => {
  const { hasLifeStyle } = useHasLifeStyleStore();

  return (
    <Pressable
      onPress={() => pressFunc(roomData.roomId)}
      className="flex flex-col rounded-xl border border-disabled px-4 py-5"
    >
      <View className="flex flex-row items-center justify-between border-b border-b-[#F6F6F6] pb-3">
        <Text className="pl-2 text-base font-semibold text-basicFont">{roomData.name}</Text>
        <Text className="text-base font-medium text-main1">
          {roomData.equality !== null && hasLifeStyle ? roomData.equality : '?? '}%
        </Text>
      </View>

      <View className="mb-6 flex flex-row items-center justify-between px-2 pt-3">
        {roomData.preferenceMatchCountList !== null &&
          roomData.preferenceMatchCountList.map((preference, index) => (
            <View key={index} className="flex w-[60px] flex-col items-center">
              {getRoomLifeStyleIcon(
                preference.preferenceName,
                preference.count === roomData.numOfArrival
                  ? 'blue'
                  : preference.count === 0
                  ? 'red'
                  : 'white',
                preference.count === roomData.numOfArrival
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

export default RoomComponent;
