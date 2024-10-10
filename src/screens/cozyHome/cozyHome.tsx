import { useRecoilValue } from 'recoil';
import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Text,
  View,
  Pressable,
  ScrollView,
  SafeAreaView,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import { MyRoomData, RoomDummyData, UserDummyData } from './dummyData';

import Advertisement from '@components/common/advertisement';
import RoomComponent from '@components/cozyHome/roomComponent';
import UserComponent from '@components/cozyHome/userComponent';
import MyRoomComponent from '@components/cozyHome/myRoomComponent';
import CreateRoomModal from '@components/cozyHome/createRoomModal';
import NoRoomComponent from '@components/cozyHome/noRoomComponent';
import RequestRoomComponent from '@components/cozyHome/requestRoomComponent';

import { profileState } from '@recoil/recoil';

import { getMyProfile } from '@server/api/member';

import useInitFcm from '@hooks/useInitFcm';

import { CozyHomeScreenProps } from '@type/param/stack';

import HomeBack from '@assets/cozyHome/homeBack.svg';
import ChatIcon from '@assets/cozyHome/chatIcon.svg';
import MegaPhoneIcon from '@assets/cozyHome/megaPhone.svg';
import ArrowIcon from '@assets/cozyHome/rightGrayArrow.svg';
import GraySchool from '@assets/cozyHome/graySchoolIcon.svg';
import BlueSchool from '@assets/cozyHome/blueSchoolIcon.svg';
import NotificationIcon from '@assets/cozyHome/notificationIcon.svg';

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

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
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

  const toRecommendRoom = () => {
    navigation.navigate('RecommendRoomScreen');
  };

  const [hasRoom, setHasRoom] = useState<boolean>(true);

  const toRoomDetail = () => {
    navigation.navigate('RoomDetailScreen');
  };

  return (
    <View className="flex-1 bg-sub1">
      <SafeAreaView
        style={{
          backgroundColor: scrollY <= height ? '#CADFFF' : 'white',
        }}
      />
      <ScrollView
        className="flex-1"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
      >
        <View className="bg-white">
          <View className="flex rounded-br-[40px] bg-sub1 pt-[18px]" onLayout={handleLayout}>
            <View className="mb-[8.5px] flex flex-row items-center justify-between px-5">
              <Pressable className="flex flex-row items-center py-2" onPress={handleSchool}>
                {school ? (
                  <>
                    <BlueSchool />
                    <Text className="ml-1.5 text-lg font-semibold text-[#5B9CFF]">인하대학교</Text>
                  </>
                ) : (
                  <>
                    <GraySchool />
                    <Text className="ml-1.5 mr-1 text-lg font-semibold text-disabledFont">
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
              <View className="mb-[14.5px] flex w-full flex-row rounded-lg bg-colorBox px-2 py-1.5">
                <MegaPhoneIcon />
                <Text className="ml-2 text-xs font-medium text-emphasizedFont">
                  [공지] 시험기간으로 인한 기숙사 통금시간 변경
                </Text>
              </View>

              {/* 초대코드로 방 만들기 & 방 참여하기 버튼 */}
              <View className="mb-[25px] flex h-[100px] w-full flex-row justify-between">
                <Pressable
                  onPress={createRoomModalOpen}
                  className="w-[49%] items-start rounded-xl bg-colorBox p-4"
                >
                  <Text className="text-base font-semibold leading-[19px] text-main1">
                    방 만들기
                  </Text>
                </Pressable>

                <Pressable
                  onPress={toJoinRoom}
                  className="w-[49%] items-start rounded-xl bg-colorBox p-4"
                >
                  <Text className="text-base font-semibold leading-[19px] text-main1">
                    방 참여하기
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>

        <View className="bg-white pt-6" style={{ paddingBottom: bottom + 80 }}>
          <View className="px-5">
            <Text className="mb-4 text-lg font-semibold leading-6 text-emphasizedFont">
              {profile.nickname}님이{'\n'}현재 참여하고 있는 방이에요
            </Text>
            {hasRoom ? (
              <MyRoomComponent roomData={MyRoomData} toRoom={toRoomDetail} />
            ) : (
              <NoRoomComponent />
            )}
          </View>

          <View className="my-6 h-2.5 bg-[#F7F9FA]" />

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

          <View className="my-6 h-2.5 bg-[#F7F9FA]" />

          <View className="pl-5">
            <View className="mb-4 flex flex-row items-center justify-between pr-5">
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

          <View className="my-6 h-2.5 bg-[#F7F9FA]" />

          <View className="mb-6 pl-5">
            <View className="mb-4 flex flex-row items-center justify-between pr-5">
              <Text className="text-lg font-semibold leading-6 text-emphasizedFont">
                {profile.nickname}님과{'\n'}꼭 맞는 방을 추천해드릴게요
              </Text>
              <Pressable onPress={toRecommendRoom}>
                <Text className="text-xs font-semibold text-disabledFont">더보기</Text>
              </Pressable>
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
