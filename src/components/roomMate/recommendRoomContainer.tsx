import React from 'react';
import { Text, View } from 'react-native';

interface RecommendRoomProps {
  index: number;
  roomItem: {
    location: string;
    type: string;
    maxNum: number;
    currentNum: number;
    title: string;
    hashTag: string[];
  };
}

const RecommendRoomContainer: React.FC<RecommendRoomProps> = ({ index, roomItem }) => {
  return (
    <View
      className={`px-2 py-[18px] border-b-[1px] border-b-[#F6F6F6] ${index === 0 && 'pt-[10px]'} ${
        index === 3 && 'pb-[10px] border-b-0'
      }`}
    >
      <View className="flex flex-row justify-between">
        <View className="flex flex-row">
          <View className="rounded-[4px] bg-colorBox px-2 py-[2px] mr-1.5">
            <Text className="text-xs font-medium text-colorFont">{roomItem.location}</Text>
          </View>
          <View className="rounded-[4px] bg-colorBox px-2 py-[2px]">
            <Text className="text-xs font-medium text-colorFont">{roomItem.type}</Text>
          </View>
        </View>

        <View>
          <Text className="text-xs font-medium text-disabledFont">
            <Text
              className={`${
                roomItem.maxNum / 2 <= roomItem.currentNum ? 'text-main1' : 'text-basicFont'
              }`}
            >
              {roomItem.currentNum}
            </Text>{' '}
            / {roomItem.maxNum}
          </Text>
        </View>
      </View>

      <View className="mt-2 mb-[10px]">
        <Text className="text-base font-semibold text-emphasizedFont">{roomItem.title}</Text>
      </View>

      <View className="flex flex-row">
        {roomItem.hashTag.map((hash, index) => (
          <View key={index}>
            <Text className="text-xs font-medium text-colorFont">#{hash} </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default RecommendRoomContainer;
