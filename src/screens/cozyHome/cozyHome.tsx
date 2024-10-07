import React, { Fragment, useEffect, useState } from 'react';
import { Button, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';

import HomeBack from '@assets/cozyHome/homeBack.svg';
import ChatIcon from '@assets/cozyHome/chatIcon.svg';
import NotificationIcon from '@assets/cozyHome/notificationIcon.svg';

import { CozyHomeScreenProps } from '@type/param/stack';
import { getMyProfile } from '@server/api/member';

import useInitFcm from '@hooks/useInitFcm';
import RoomComponent from '@components/cozyHome/roomComponent';

import { MyRoomData, RoomDummyData, UserDummyData } from './dummyData';
import UserComponent from '@components/cozyHome/userComponent';
import RequestRoomComponent from '@components/cozyHome/requestRoomComponent';
import { useRecoilValue } from 'recoil';
import { profileState } from '@recoil/recoil';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MyRoomComponent from '@components/cozyHome/myRoomComponent';
import CreateRoomModal from '@components/cozyHome/createRoomModal';

const CozyHomeScreen = ({ navigation }: CozyHomeScreenProps) => {
  const profile = useRecoilValue(profileState);
  const { bottom } = useSafeAreaInsets();

  const { initFcm } = useInitFcm();

  useEffect(() => {
    const getProfile = async () => {
      const response = await getMyProfile();
      console.log(response);
    };
    getProfile();
    initFcm();
  }, []);

  const [createRoomOpen, setCreateRoomOpen] = useState<boolean>(false);

  const createRoomModalOpen = () => {
    setCreateRoomOpen(true);
  };

  const createRoomModalClose = () => {
    setCreateRoomOpen(false);
  };
  const toCreatePublicRoom = () => {
    navigation.navigate('CreateRoomScreen', { type: 'public' });
    setCreateRoomOpen(false);
  };

  const toCreatePrivateRoom = () => {
    navigation.navigate('CreateRoomScreen', { type: 'private' });
    setCreateRoomOpen(false);
  };

  const toJoinRoom = () => {
    navigation.navigate('JoinRoomScreen');
  };

  const toChat = () => {
    navigation.navigate('ChatScreen');
  };

  const toNotification = () => {
    navigation.navigate('NotificationScreen');
  };

  const [hasRoom, setHasRoom] = useState<boolean>(false);
  const [hasRequest, setHasRequset] = useState<boolean>(false);

  return (
    <Fragment>
      <SafeAreaView className="bg-[#CADFFF]" />
      <SafeAreaView className="flex-col flex-1 bg-[#CADFFF]">
        <View className="flex pt-4 bg-[#CADFFF]">
          <HomeBack style={{ position: 'absolute' }} />
          <View className="flex flex-row justify-between items-center px-5 mb-[8.5px]">
            <Pressable>
              <Text className="text-2xl font-extrabold font-['Cafe24_Meongi_B']">
                <Text className="text-main2">cozy</Text>
                <Text className="text-main1">mate</Text>
              </Text>
            </Pressable>

            <View className="flex flex-row">
              <Pressable onPress={toChat}>
                <ChatIcon />
              </Pressable>
              <Pressable onPress={toNotification}>
                <NotificationIcon />
              </Pressable>
            </View>
          </View>

          <View className="flex flex-col items-start px-5">
            <View className="w-full rounded-lg bg-colorBox mb-[14.5px] px-2 py-1.5">
              <Text className="text-xs font-medium text-emphasizedFont">
                [공지] 시험기간으로 인한 기숙사 통금시간 변경
              </Text>
            </View>

            {/* 초대코드로 방 만들기 & 방 참여하기 버튼 */}
            <View className="flex flex-row justify-between w-full mb-4 h-[100px]">
              <Pressable
                onPress={createRoomModalOpen}
                className="bg-colorBox px-4 py-4 rounded-xl w-[49%] items-start"
              >
                <Text className="text-main1 text-base font-semibold leading-[19px]">방 만들기</Text>
              </Pressable>

              <Pressable
                onPress={toJoinRoom}
                className="bg-colorBox px-4 py-4 rounded-xl w-[49%] items-start"
              >
                <Text className="text-main1 text-base font-semibold leading-[19px]">
                  방 참여하기
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View className="flex flex-row justify-center">
          <Button
            title="방 X & 신청 X"
            onPress={() => {
              setHasRoom(false);
              setHasRequset(false);
            }}
          />

          <Button
            title="방 X & 신청 O"
            onPress={() => {
              setHasRoom(false);
              setHasRequset(true);
            }}
          />

          <Button
            title="방 O"
            onPress={() => {
              setHasRoom(true);
              setHasRequset(true);
            }}
          />
        </View>

        <ScrollView className="flex flex-col h-full bg-white rounded-[20px]">
          {/* 방 없음 & 신청 없음 */}
          {!hasRoom && !hasRequest && (
            <View className="py-6 pl-5" style={{ paddingBottom: bottom + 40 }}>
              <Text className="mb-4 text-lg font-semibold leading-6 text-emphasizedFont">
                {profile.nickname}님과{'\n'}꼭 맞는 방을 추천해드릴게요
              </Text>
              <ScrollView
                className="flex flex-row mb-16"
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {RoomDummyData.map((data, index) => (
                  <RoomComponent index={index} roomData={data} />
                ))}
              </ScrollView>

              <Text className="mb-4 text-lg font-semibold leading-6 text-emphasizedFont">
                {profile.nickname}님,{'\n'}이런 룸메이트는 어때요?
              </Text>
              <ScrollView
                className="flex flex-row"
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {UserDummyData.map((data, index) => (
                  <UserComponent index={index} userData={data} />
                ))}
              </ScrollView>
            </View>
          )}

          {/* 방 없음 & 신청 있음 */}
          {!hasRoom && hasRequest && (
            <View className="px-5 py-6" style={{ paddingBottom: bottom + 40 }}>
              <Text className="mb-4 text-lg font-semibold leading-6 text-emphasizedFont">
                {profile.nickname}님이{'\n'}참여요청한 방 목록이에요
              </Text>
              <ScrollView className="flex flex-col mb-16">
                {RoomDummyData.map((data, index) => (
                  <RequestRoomComponent index={index} roomData={data} />
                ))}
              </ScrollView>

              <Text className="mb-4 text-lg font-semibold leading-6 text-emphasizedFont">
                {profile.nickname}님과{'\n'}꼭 맞는 방을 추천해드릴게요
              </Text>
              <ScrollView
                className="flex flex-row"
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {RoomDummyData.map((data, index) => (
                  <RoomComponent index={index} roomData={data} />
                ))}
              </ScrollView>
            </View>
          )}

          {/* 방 있음*/}
          {hasRoom && (
            <View className="px-5 py-6" style={{ paddingBottom: bottom + 40 }}>
              <Text className="mb-4 text-lg font-semibold leading-6 text-emphasizedFont">
                {profile.nickname}님이{'\n'}현재 참여하고 있는 방이에요
              </Text>
              <MyRoomComponent roomData={MyRoomData} />

              <Text className="mt-16 mb-4 text-lg font-semibold leading-6 text-emphasizedFont">
                {profile.nickname}님,{'\n'}이런 룸메이트는 어때요?
              </Text>
              <ScrollView
                className="flex flex-row"
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {UserDummyData.map((data, index) => (
                  <UserComponent index={index} userData={data} />
                ))}
              </ScrollView>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>

      {createRoomOpen && (
        <CreateRoomModal
          createPublic={toCreatePublicRoom}
          createPrivate={toCreatePrivateRoom}
          close={createRoomModalClose}
        />
      )}
    </Fragment>
  );
};

export default CozyHomeScreen;
