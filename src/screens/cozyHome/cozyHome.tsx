import React, { useEffect, useState } from 'react';
import { LayoutChangeEvent, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';

import GraySchool from '@assets/cozyHome/graySchoolIcon.svg';
import BlueSchool from '@assets/cozyHome/blueSchoolIcon.svg';
import ArrowIcon from '@assets/cozyHome/rightGrayArrow.svg';
import MegaPhoneIcon from '@assets/cozyHome/megaPhone.svg';

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
import NoRoomComponent from '@components/cozyHome/noRoomComponent';
import Advertisement from '@components/common/advertisement';

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

  // 학교 인증 관련
  const [school, setSchool] = useState<boolean>(false);

  const handleSchool = () => {
    setSchool(!school);
  };

  // 스크롤 시 SafeAreaView 색상 관련
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = (event: any) => {
    setScrollY(event.nativeEvent.contentOffset.y);
  };

  const [height, setHeight] = useState<number>(0);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setHeight(height);
  };

  // 방 만들기 시 방 타입 선택 모달
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

  // 방 참여하기
  const toJoinRoom = () => {
    navigation.navigate('JoinRoomScreen');
  };

  // 쪽지
  const toChat = () => {
    navigation.navigate('ChatScreen');
  };

  // 알림
  const toNotification = () => {
    navigation.navigate('NotificationScreen');
  };

  const toRoomMate = () => {
    navigation.navigate('RoomMateScreen');
  };

  const [hasRoom, setHasRoom] = useState<boolean>(false);

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView
        style={{
          backgroundColor: scrollY <= height ? '#CADFFF' : 'white',
        }}
      />
      <ScrollView className="flex-1" onScroll={handleScroll} scrollEventThrottle={16}>
        <View className="flex pt-[18px] bg-[#CADFFF] rounded-br-[40px]" onLayout={handleLayout}>
          <View className="flex flex-row justify-between items-center px-5 mb-[8.5px]">
            <Pressable className="flex flex-row items-center py-2" onPress={handleSchool}>
              {school ? (
                <>
                  <BlueSchool />
                  <Text className="text-lg font-semibold text-[#5B9CFF] ml-1.5">인하대학교</Text>
                </>
              ) : (
                <>
                  <GraySchool />
                  <Text className="text-lg font-semibold text-disabledFont ml-1.5 mr-1">
                    학교 인증을 해주세요
                  </Text>
                  <ArrowIcon />
                </>
              )}
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
            <View className="w-full rounded-lg bg-colorBox mb-[14.5px] px-2 py-1.5 flex flex-row">
              <MegaPhoneIcon />
              <Text className="ml-2 text-xs font-medium text-emphasizedFont">
                [공지] 시험기간으로 인한 기숙사 통금시간 변경
              </Text>
            </View>

            {/* 초대코드로 방 만들기 & 방 참여하기 버튼 */}
            <View className="flex flex-row justify-between w-full mb-[25px] h-[100px]">
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

        <View className="pt-6 bg-white" style={{ paddingBottom: bottom + 80 }}>
          <View className="px-5">
            <Text className="mb-4 text-lg font-semibold leading-6 text-emphasizedFont">
              {profile.nickname}님이{'\n'}현재 참여하고 있는 방이에요
            </Text>
            {hasRoom ? <MyRoomComponent roomData={MyRoomData} /> : <NoRoomComponent />}
          </View>

          <View className="bg-[#F7F9FA] h-2.5 my-6" />

          <View className="px-5">
            <Text className="mb-4 text-lg font-semibold leading-6 text-emphasizedFont">
              {profile.nickname}님이{'\n'}참여요청한 방 목록이에요
            </Text>
            <ScrollView className="flex flex-col">
              {RoomDummyData.map((data, index) => (
                <RequestRoomComponent key={index} index={index} roomData={data} />
              ))}
            </ScrollView>
          </View>

          <View className="bg-[#F7F9FA] h-2.5 my-6" />

          <View className="pl-5">
            <View className="flex flex-row items-center justify-between pr-5 mb-4">
              <Text className="text-lg font-semibold leading-6 text-emphasizedFont">
                {profile.nickname}님,{'\n'}이런 룸메이트는 어때요?
              </Text>
              <Pressable onPress={toRoomMate}>
                <Text className="text-xs font-semibold text-disabledFont">더보기</Text>
              </Pressable>
            </View>
            <ScrollView
              className="flex flex-row"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {UserDummyData.map((data, index) => (
                <UserComponent key={index} index={index} userData={data} />
              ))}
            </ScrollView>
          </View>

          <View className="bg-[#F7F9FA] h-2.5 my-6" />

          <View className="pl-5 mb-6">
            <View className="flex flex-row items-center justify-between pr-5 mb-4">
              <Text className="text-lg font-semibold leading-6 text-emphasizedFont">
                {profile.nickname}님과{'\n'}꼭 맞는 방을 추천해드릴게요
              </Text>
              <Text className="text-xs font-semibold text-disabledFont">더보기</Text>
            </View>
            <ScrollView
              className="flex flex-row"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {RoomDummyData.map((data, index) => (
                <RoomComponent key={index} index={index} roomData={data} />
              ))}
            </ScrollView>
          </View>

          <View className="relative px-5">
            <Advertisement />
          </View>
        </View>

        {createRoomOpen && (
          <CreateRoomModal
            createPublic={toCreatePublicRoom}
            createPrivate={toCreatePrivateRoom}
            close={createRoomModalClose}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default CozyHomeScreen;
