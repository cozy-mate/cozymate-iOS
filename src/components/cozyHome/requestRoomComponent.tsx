import React, { useState } from 'react';
import { Dimensions, Pressable, Text, View } from 'react-native';

interface RequestRoomComponentProps {
  index: number;
  roomData: {
    title: string;
    hashTag: string[];
    currentNum: number;
    equality: number;
  };
}

const RequestRoomComponent: React.FC<RequestRoomComponentProps> = ({ index, roomData }) => {
  const [hasTagLen, setHashTagLen] = useState<number>(0);

  return (
    <Pressable
      className={`px-1 py-[18px] border-b-[1px] border-b-[#F6F6F6] ${index === 0 && 'pt-2.5'} ${
        index === 3 && 'border-b-0 pb-2.5'
      }`}
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

export default RequestRoomComponent;
