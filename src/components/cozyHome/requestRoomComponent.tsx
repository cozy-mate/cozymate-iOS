import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { LifestyleOptionKey } from '@utils/getLifeStyleIcon';

interface RequestRoomComponentProps {
  index: number;
  length: number;
  roomData: {
    roomId: number;
    name: string;
    inviteCode: string;
    persona: number;
    mateDetailList: {
      memberId: number;
      mateId: number;
      nickname: string;
      persona: number;
      mateEquality: number;
    }[];
    managerMemberId: number;
    managerNickname: string;
    isRoomManager: boolean;
    maxMateNum: number;
    arrivalMateNum: number;
    roomType: string;
    hashtagList: string[];
    equality: number;
    difference: {
      blue: LifestyleOptionKey[];
      red: LifestyleOptionKey[];
      white: LifestyleOptionKey[];
    };
  };
  pressFunc: () => void;
}

const RequestRoomComponent: React.FC<RequestRoomComponentProps> = ({
  index,
  length,
  roomData,
  pressFunc,
}) => {
  return (
    <Pressable
      onPress={pressFunc}
      className={`border-b border-b-[#F6F6F6] px-1 py-[18px] ${index === 0 && 'pt-2.5'} ${
        index === length - 1 && 'border-b-0 pb-2.5'
      }`}
    >
      <View className="flex flex-row">
        {roomData.hashtagList.length !== 0 ? (
          roomData.hashtagList.map((hash, index) => (
            <View key={index} className="mr-1.5 rounded bg-colorBox px-2 py-[2px]">
              <Text className="text-xs font-medium text-colorFont">#{hash} </Text>
            </View>
          ))
        ) : (
          <View className="mr-1.5 rounded bg-colorBox px-2 py-[2px]">
            <Text className="text-xs font-medium text-colorFont">비공개방이에요</Text>
          </View>
        )}
      </View>

      <View className="my-2">
        <Text className="text-base font-semibold text-emphasizedFont">{roomData.name}</Text>
      </View>

      <View className="flex flex-row items-center justify-between">
        <Text className="text-xs font-medium text-disabledFont">
          <Text className="text-main1">{roomData.arrivalMateNum}명</Text>의 룸메이트가 있어요
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
