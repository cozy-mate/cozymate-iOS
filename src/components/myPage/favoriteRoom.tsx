import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { getRoomLifeStyleIcon } from '@utils/getLifeStyleIcon';

import { FavoriteUserRoomScreenProps } from '@type/param/stack';

interface FavoriteRoomProps {
  roomData: {
    favoriteId: number;
    equality: number;
    roomId: number;
    name: string;
    preferenceMatchCountList: {
      preferenceName: string;
      count: number;
    }[];
    hashtagList: [];
    maxMateNum: number;
    currentMateNum: number;
  };
  navigation: FavoriteUserRoomScreenProps['navigation'];
}

const FavoriteRoom: React.FC<FavoriteRoomProps> = ({ roomData, navigation }) => {
  return (
    <Pressable
      onPress={() => navigation.navigate('RoomDetailScreen', { roomId: roomData.roomId })}
      className="flex flex-col rounded-xl border border-disabled px-4 py-5"
    >
      <View className="flex flex-row items-center justify-between border-b border-b-[#F6F6F6] pb-3">
        <Text className="pl-2 text-base font-semibold text-basicFont">{roomData.name}</Text>
        <Text className="text-base font-medium text-main1">{roomData.equality}%</Text>
      </View>

      <View className="mb-6 flex flex-row items-center justify-between px-2 pt-3">
        {roomData.preferenceMatchCountList.map((chip, index) => (
          <View key={index} className="flex w-[60px] flex-col items-center">
            {getRoomLifeStyleIcon(
              chip.preferenceName,
              chip.count === roomData.currentMateNum ? 'blue' : chip.count === 0 ? 'red' : 'white',
              chip.count === roomData.currentMateNum
                ? '모두 일치'
                : chip.count !== null
                ? `${chip.count}명 일치`
                : '??',
            )}
          </View>
        ))}
      </View>

      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row">
          {roomData.hashtagList.map((hash, index) => (
            <View key={index} className="mr-1.5 rounded bg-colorBox px-2 py-0.5">
              <Text className="text-xs font-medium text-colorFont">#{hash}</Text>
            </View>
          ))}
        </View>

        <View className="flex flex-row items-center">
          <Text className="text-xs font-medium text-disabledFont">
            {roomData.currentMateNum} / {roomData.maxMateNum}명
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default FavoriteRoom;
