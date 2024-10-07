import React, { useState } from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';

interface RoomComponentProps {
  index: number;
  roomData: {
    title: string;
    hashTag: string[];
    currentNum: number;
    equality: number;
  };
}

const RoomComponent: React.FC<RoomComponentProps> = ({ index, roomData }) => {
  const screenWidth = Dimensions.get('window').width;
  const containerWidth = screenWidth * 0.65;

  const [hasTagLen, setHashTagLen] = useState<number>(0);

  return (
    <Pressable
      style={{ width: containerWidth }}
      className="p-4 border-[1px] border-disabled rounded-xl mr-5"
    >
      <View className="flex flex-row">
        {roomData.hashTag.map((hash, index) => (
          <View key={index} className="rounded bg-colorBox px-2 py-[2px] mr-1.5">
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
