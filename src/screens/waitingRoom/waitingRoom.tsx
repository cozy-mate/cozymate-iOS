import React, { useState } from 'react';
import Config from 'react-native-config';
import { Text, View, Image, Pressable, ScrollView, SafeAreaView } from 'react-native';

import RoomMateBox from '@components/waitingRoom/roomMateBox';

import { getProfileImage } from '@utils/profileImage';

import { WaitingRoomScreenProps } from '@type/param/stack';

import XButton from '@assets/xButton.svg';
import HomeIcon from '@assets/waitingRoom/homeIcon.svg';
import ResetIcon from '@assets/waitingRoom/resetIcon.svg';
import PersonIcon from '@assets/waitingRoom/personIcon.svg';

const WaitingRoomScreen = ({ navigation }: WaitingRoomScreenProps) => {
  const [roomInfo, setRoomInfo] = useState({
    roomName: '피그말리온',
    profileImage: 5,
    numOfMate: 6,
  });

  const [memberList, setMemberList] = useState([
    {
      name: '델로',
      profileImage: 1,
      state: '도착완료',
      isAdmin: true,
    },
    {
      name: '포비',
      profileImage: 2,
      state: '도착완료',
      isAdmin: false,
    },
    {
      name: '눈꽃',
      profileImage: 3,
      state: '도착완료',
      isAdmin: false,
    },
  ]);

  // 총 인원 수보다 멤버리스트가 적다면 추가
  const fullMemberList = [...memberList];

  while (fullMemberList.length < roomInfo.numOfMate) {
    fullMemberList.push({
      name: '???',
      profileImage: 0,
      state: '대기중',
      isAdmin: false,
    });
  }

  const toMain = () => {
    navigation.navigate('MainScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="flex flex-1 flex-col px-5">
          <View className="flex">
            <View className="mb-8 mt-2 flex flex-row justify-end">
              <Pressable onPress={toMain}>
                <XButton />
              </Pressable>
            </View>

            <View className="mb-10 flex flex-col items-center">
              <Text className="text-xl font-semibold text-emphasizedFont">
                cozymate가 모이고 있어요!
              </Text>
              <Text className="text-sm font-medium text-disabledFont">
                모든 cozymate가 모이면 방이 열려요..
              </Text>
            </View>

            <View className="mb-8 flex flex-col items-center">
              {getProfileImage(roomInfo.profileImage, 120, 120)}
              <View className="mt-3 flex flex-row">
                <View className="flex flex-row items-center">
                  <HomeIcon />
                  <Text className="ml-1 text-xs font-medium text-basicFont">
                    {roomInfo.roomName}
                  </Text>
                </View>

                <View className="mx-2 h-[14px] w-px rounded-md bg-box" />

                <View className="flex flex-row items-center">
                  <PersonIcon />
                  <Text className="ml-1 text-xs font-medium text-basicFont">
                    {roomInfo.numOfMate}명
                  </Text>
                </View>
              </View>
            </View>

            <View className="mb-14 flex flex-col items-end">
              <ResetIcon />
              <View className="flxex mt-8 flex-row flex-wrap justify-between">
                {fullMemberList.map((member, index) => (
                  <RoomMateBox
                    key={index}
                    name={member.name}
                    profileImage={member.profileImage}
                    state={member.state}
                    isAdmin={member.isAdmin}
                  />
                ))}
              </View>
            </View>

            <View className="flex rounded-xl bg-main1 p-4">
              <Pressable>
                <Text className="text-center text-base font-semibold text-white">방 삭제하기</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WaitingRoomScreen;
