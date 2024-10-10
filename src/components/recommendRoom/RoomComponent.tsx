import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';

interface RoomComponentProps {
  index: number;
  roomData: {
    title: string;
    hashTag: string[];
    currentNum: number;
    equality: number;
  };
  toRoomDetail: () => void;
}

const RoomComponent: React.FC<RoomComponentProps> = ({ index, roomData, toRoomDetail }) => {
  return (
    <Pressable
      onPress={toRoomDetail}
      className={`border-b border-b-[#F6F6F6] px-1 py-[26px] ${index === 0 && 'pt-2.5'} ${index === 7 && 'border-0 pb-2.5'}`}
    >
      <View className="flex flex-row">
        {roomData.hashTag.map((hash, index) => (
          <View key={index} className="mr-1.5 rounded bg-colorBox px-2 py-[2px]">
            <Text className="text-xs font-medium text-colorFont">#{hash} </Text>
          </View>
        ))}
      </View>

      <View className="my-2">
        <Text className="text-base font-semibold text-emphasizedFont">{roomData.title}</Text>
      </View>

      <View className="flex flex-row items-center justify-between">
        <Text className="text-xs font-medium text-disabledFont">
          <Text className="text-main1">{roomData.currentNum}명</Text>의 룸메이트가 있어요
        </Text>

        <Text
          className={`text-base font-medium ${
            roomData.equality < 50 ? 'text-colorFont' : 'text-main1'
          }`}
        >
          {roomData.equality}%
        </Text>
      </View>
    </Pressable>
  );
};

export default RoomComponent;
