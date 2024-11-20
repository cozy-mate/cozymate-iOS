import React from 'react';
import { Text, View, Pressable } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { useProfileStore } from '@zustand/member/member';

import { LifestyleOptionKey } from '@utils/getLifeStyleIcon';

import { CozyHomeScreenProps } from '@type/param/stack';

interface MyRoomComponentProps {
  navigation: CozyHomeScreenProps['navigation'];
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

const MyRoomComponent: React.FC<MyRoomComponentProps> = ({ navigation, roomData }) => {
  const { profile } = useProfileStore();

  const toRoomDetail = (roomId: number) => {
    navigation.navigate('RoomDetailScreen', { roomId: roomId });
  };

  return (
    <View className="px-5">
      <Text className="mb-4 px-1 text-lg font-semibold leading-6 text-emphasizedFont">
        {profile.nickname}님이{'\n'}현재 참여하고 있는 방이에요
      </Text>

      <Pressable
        onPress={() => toRoomDetail(roomData.roomId)}
        className="rounded-xl border border-main1"
      >
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
    </View>
  );
};

export default MyRoomComponent;
