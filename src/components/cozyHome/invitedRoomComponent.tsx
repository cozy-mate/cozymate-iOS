import React from 'react';
import { Text, View, Pressable } from 'react-native';

import { LifestyleOptionKey } from '@utils/getLifeStyleIcon';

import { CozyHomeScreenProps } from '@type/param/stack';

import BlueArrow from '@assets/roomMate/blueRightArrow.svg';

interface InvitedRoomsComponentProps {
  navigation: CozyHomeScreenProps['navigation'];
  requestCount: number | undefined;
  roomList: {
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
  }[];
}

const InvitedRoomsComponent: React.FC<InvitedRoomsComponentProps> = ({
  navigation,
  requestCount,
  roomList,
}) => {
  const toRoomDetail = (roomId: number) => {
    navigation.navigate('RoomDetailScreen', { roomId: roomId });
  };

  const toRoomMate = () => {
    navigation.navigate('RoomMateScreen');
  };

  return (
    <View className="px-5">
      <Text className="mb-4 px-1 text-lg font-semibold leading-6 text-emphasizedFont">
        <Text className="text-colorFont">{requestCount}개의</Text>
        {'\n'}방 참여 요청이 도착했어요
      </Text>

      <View className="flex flex-col">
        {requestCount !== 0 ? (
          roomList.map((room, index) => (
            <Pressable
              key={room.roomId}
              onPress={() => toRoomDetail(room.roomId)}
              className={`border-b border-b-[#F6F6F6] px-1 py-[18px] ${index === 0 && 'pt-2.5'} ${
                index === roomList.length - 1 && 'border-b-0 pb-2.5'
              }`}
            >
              <View className="flex flex-row">
                {room.hashtagList.length !== 0 ? (
                  room.hashtagList.map((hash, index) => (
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
                <Text className="text-base font-semibold text-emphasizedFont">{room.name}</Text>
              </View>

              <View className="flex flex-row items-center justify-between">
                <Text className="text-xs font-medium text-disabledFont">
                  <Text className="text-main1">{room.arrivalMateNum}명</Text>의 룸메이트가 있어요
                </Text>

                <Text
                  className={`text-base font-medium ${
                    room.equality < 50 ? 'text-colorFont' : 'text-main1'
                  }`}
                >
                  {room.equality}%
                </Text>
              </View>
            </Pressable>
          ))
        ) : (
          <View className="flex h-36 items-center justify-center rounded-xl p-2">
            <Text className="text-sm font-medium text-disabledFont">
              직접 룸메이트를 찾으러 가볼까요?
            </Text>
            <Pressable onPress={toRoomMate} className="flex flex-row items-center space-x-2">
              <Text className="text-base font-semibold text-main1">룸메이트 찾으러 가기</Text>
              <BlueArrow />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
};

export default InvitedRoomsComponent;
