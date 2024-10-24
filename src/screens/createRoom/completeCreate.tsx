import React from 'react';
import { Text, View, Pressable, SafeAreaView } from 'react-native';

import { useHasRoomStore, useRoomInfoStore } from '@zustand/room/room';

import { onCopyAddress } from '@utils/clipboard';
import { getProfileImage } from '@utils/profileImage';

import { CompleteCreateRoomScreenProps } from '@type/param/stack';

import CopyIcon from '@assets/createRoom/copyIcon.svg';

const CompleteCreateRoomScreen = ({ navigation, route }: CompleteCreateRoomScreenProps) => {
  const { type } = route.params;

  const { roomInfo } = useRoomInfoStore();
  const { setMyRoom } = useHasRoomStore();

  const toCozyHome = () => {
    setMyRoom({ hasRoom: true, roomId: roomInfo.roomId });
    navigation.navigate('MainScreen');
  };

  const handleCopyInviteCode = () => {
    if (roomInfo.inviteCode) {
      onCopyAddress(roomInfo.inviteCode);
    }
  };

  return (
    <SafeAreaView className="flex flex-1 flex-col justify-between bg-white">
      <View className="mt-[81px] flex flex-1 flex-col justify-between px-5">
        <View className="flex items-center">
          <View className="mb-5 flex flex-col">
            <Text className="mb-1 text-center text-xl font-semibold text-emphasizedFont">
              방 생성을 완료했어요!
            </Text>
            <Text className="text-center text-sm font-medium text-basicFont">
              초대코드를 공유해 룸메이트를 모아보세요..
            </Text>
          </View>

          {type === 'PRIVATE' && roomInfo.inviteCode && (
            <Pressable onPress={handleCopyInviteCode} className="mb-16 flex">
              <View className="flex flex-row items-center rounded-xl bg-colorBox px-6 py-3">
                <Text className="mr-1 text-base font-semibold text-main1">
                  {roomInfo.inviteCode}
                </Text>
                <CopyIcon />
              </View>
            </Pressable>
          )}

          <View className="flex">{getProfileImage(roomInfo.profileImage, 300, 300)}</View>
        </View>

        <View className="flex">
          <Pressable onPress={toCozyHome}>
            <View className="rounded-xl bg-main1 p-4">
              <Text className="text-center text-base font-semibold text-white">확인</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CompleteCreateRoomScreen;
