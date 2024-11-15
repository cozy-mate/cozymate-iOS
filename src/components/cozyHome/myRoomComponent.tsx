import React from 'react';
import { Text, View, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { LifestyleOptionKey } from '@utils/getLifeStyleIcon';

interface MyRoomComponentProps {
  toRoom: () => void;
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
}

const MyRoomComponent: React.FC<MyRoomComponentProps> = ({ toRoom, roomData }) => {
  return (
    <Pressable className="rounded-xl border border-main1" onPress={toRoom}>
      <LinearGradient
        colors={['rgba(249, 251, 255, 0.8)', 'rgba(223, 236, 255, 0.8)']}
        start={{ x: 0.008, y: 0 }}
        end={{ x: 1.044, y: 1 }}
        className="rounded-xl p-4"
      >
        <View className="flex flex-row">
          {roomData.hashtagList.length !== 0 ? (
            roomData.hashtagList.map((hash, index) => (
              <View key={index} className="mr-1.5 rounded bg-white px-2 py-[2px]">
                <Text className="text-xs font-medium text-colorFont">#{hash}</Text>
              </View>
            ))
          ) : (
            <View className="mr-1.5 rounded py-[2px]">
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

          <Text className="text-base font-medium text-colorFont">{roomData.equality}%</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

export default MyRoomComponent;
