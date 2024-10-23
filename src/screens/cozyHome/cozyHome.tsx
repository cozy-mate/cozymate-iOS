import React, { useState, useEffect, useCallback } from 'react';
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

import { RoomDummyData, sameAnswerDummyData, recommendRoomDummyData } from './dummyData';

import Advertisement from '@components/common/advertisement';
import MyRoomComponent from '@components/cozyHome/myRoomComponent';
import CreateRoomModal from '@components/cozyHome/createRoomModal';
import NoRoomComponent from '@components/cozyHome/noRoomComponent';
import RequestRoomComponent from '@components/cozyHome/requestRoomComponent';
import RecommendRoomComponent from '@components/cozyHome/recommendRoomComponent';
import SameAnswerUserComponent from '@components/cozyHome/sameAnswerUserComponent';

import { useHasRoomStore } from '@zustand/room/room';
import { useProfileStore } from '@zustand/member/member';

import { getMyProfile } from '@server/api/member';

import useInitFcm from '@hooks/useInitFcm';
import { useGetRoomData } from '@hooks/api/room';

import { CozyHomeScreenProps } from '@type/param/stack';

import HomeBack from '@assets/cozyHome/homeBack.svg';
import ChatIcon from '@assets/cozyHome/chatIcon.svg';
import MegaPhoneIcon from '@assets/cozyHome/megaPhone.svg';
import ArrowIcon from '@assets/cozyHome/rightGrayArrow.svg';
import GraySchool from '@assets/cozyHome/graySchoolIcon.svg';
import BlueSchool from '@assets/cozyHome/blueSchoolIcon.svg';
import RightArrow from '@assets/cozyHome/smallRightArrow.svg';
import NotificationIcon from '@assets/cozyHome/notificationIcon.svg';

const CozyHomeScreen = ({ navigation }: CozyHomeScreenProps) => {
  const { profile } = useProfileStore();
  const { myRoom } = useHasRoomStore();

  const { bottom } = useSafeAreaInsets();

  const { data: roomData } = useGetRoomData(myRoom.roomId);

  const [userComponentWidth, setUserComponentWidth] = useState<number>(0);
  const [userCurrentIndex, setUserCurrentIndex] = useState<number>(0);

  // 레이아웃이 변경될 때 크기를 계산하는 함수
  const onLayoutUser = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setUserComponentWidth(width);
  }, []);

  // "이런 룸메이트는 어때요?" 부분의 유저 컴포넌트의 index가 변경될 때 현재 인덱스를 계산하는 메서드
  const handleSameAnswerUserScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offsetX / userComponentWidth);
    setUserCurrentIndex(index);
  };

  const [roomComponentWidth, setRoomComponentWidth] = useState<number>(0);
  const [roomCurrentIndex, setRoomCurrentIndex] = useState<number>(0);

  // 레이아웃이 변경될 때 크기를 계산하는 함수
  const onLayoutRoom = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setRoomComponentWidth(width);
  }, []);

  // "꼭 맞는 방을 추천해드릴게요" 부분의 룸 컴포넌트의 index가 변경될 때 현재 인덱스를 계산하는 메서드
  const handleRecommendRoomScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(offsetX / roomComponentWidth);
    setRoomCurrentIndex(index);
  };

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
    navigation.navigate('CreateRoomScreen', { type: 'PUBLIC' });
    setCreateRoomOpen(false);
  };

  const toCreatePrivateRoom = () => {
    navigation.navigate('CreateRoomScreen', { type: 'PRIVATE' });
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

  const toRoomDetail = () => {
    navigation.navigate('RoomDetailScreen', { roomId: myRoom.roomId });
  };

  const toSchoolAuthentication = () => {
    navigation.navigate('SchoolAuthenticationScreen');
  };

  const toLifeStyle = () => {
    navigation.navigate('LifeStyleOnboardingScreen');
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
            <HomeBack style={{ position: 'absolute' }} />
            <View style={{ position: 'relative', zIndex: 100 }}>
              <View className="mb-[8.5px] flex flex-row items-center justify-between px-5">
                {school ? (
                  <Pressable
                    className="flex flex-row items-center py-2"
                    onPress={toSchoolAuthentication}
                  >
                    <View className="flex flex-row items-center">
                      <BlueSchool />
                      <Text className="ml-1.5 text-lg font-semibold text-[#5B9CFF]">
                        인하대학교
                      </Text>
                    </View>
                  </Pressable>
                ) : (
                  <Pressable
                    className="flex flex-row items-center py-2"
                    onPress={toSchoolAuthentication}
                  >
                    <View className="flex flex-row items-center">
                      <GraySchool />
                      <Text className="ml-1.5 mr-1 text-lg font-semibold text-disabledFont">
                        학교 인증을 해주세요
                      </Text>
                      <ArrowIcon />
                    </View>
                  </Pressable>
                )}

                <View className="flex flex-row">
                  <Pressable onPress={toChat}>
                    <ChatIcon />
                  </Pressable>
                  <Pressable onPress={toLifeStyle}>
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
        </View>

        <View className="bg-white pt-6" style={{ paddingBottom: bottom + 80 }}>
          <View className="px-5">
            <Text className="mb-4 px-1 text-lg font-semibold leading-6 text-emphasizedFont">
              {profile.nickname}님이{'\n'}현재 참여하고 있는 방이에요
            </Text>
            {myRoom.hasRoom ? (
              <MyRoomComponent roomData={roomData.result} toRoom={toRoomDetail} />
            ) : (
              <NoRoomComponent />
            )}
          </View>

          <View className="my-6 h-2.5 bg-[#F7F9FA]" />

          <View className="px-5">
            <Text className="mb-4 px-1 text-lg font-semibold leading-6 text-emphasizedFont">
              {profile.nickname}님이{'\n'}참여요청한 방 목록이에요
            </Text>
            <ScrollView className="flex flex-col">
              {RoomDummyData.map((data, index) => (
                <RequestRoomComponent key={index} index={index} roomData={data} />
              ))}
            </ScrollView>
          </View>

          <View className="my-6 h-2.5 bg-[#F7F9FA]" />

          <View className="px-5">
            <View className="mb-4 flex flex-row items-center justify-between">
              <Text className="px-1 text-lg font-semibold leading-6 text-emphasizedFont">
                {profile.nickname}님,{'\n'}이런 룸메이트는 어때요?
              </Text>
              <Pressable className="flex flex-row items-center" onPress={toRoomMate}>
                <Text className="mr-1 text-xs font-semibold text-disabledFont">더보기</Text>
                <RightArrow />
              </Pressable>
            </View>
            <ScrollView
              className="flex flex-row"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              snapToInterval={userComponentWidth}
              onScroll={handleSameAnswerUserScroll}
              decelerationRate="fast"
              disableIntervalMomentum={true}
              scrollEventThrottle={16}
              bounces={false}
            >
              {sameAnswerDummyData.map((data, index) => (
                <SameAnswerUserComponent key={index} userData={data} onLayout={onLayoutUser} />
              ))}
            </ScrollView>

            <View className="mt-4 flex flex-row justify-center space-x-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <View
                  key={index}
                  className={`${
                    index == userCurrentIndex ? 'w-4 bg-main1' : 'w-2 bg-disabled'
                  } h-2 rounded-full`}
                />
              ))}
            </View>
          </View>

          <View className="my-6 h-2.5 bg-[#F7F9FA]" />

          <View className="mb-6 px-5">
            <View className="mb-4 flex flex-row items-center justify-between">
              <Text className="px-1 text-lg font-semibold leading-6 text-emphasizedFont">
                {profile.nickname}님과{'\n'}꼭 맞는 방을 추천해드릴게요
              </Text>
              <Pressable className="flex flex-row items-center" onPress={toRecommendRoom}>
                <Text className="mr-1 text-xs font-semibold text-disabledFont">더보기</Text>
                <RightArrow />
              </Pressable>
            </View>
            <ScrollView
              className="flex flex-row"
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              snapToInterval={roomComponentWidth}
              onScroll={handleRecommendRoomScroll}
              decelerationRate="fast"
              scrollEventThrottle={16}
              bounces={false}
            >
              {recommendRoomDummyData.map((data, index) => (
                <RecommendRoomComponent key={index} roomData={data} onLayout={onLayoutRoom} />
              ))}
            </ScrollView>

            <View className="mt-4 flex flex-row justify-center space-x-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <View
                  key={index}
                  className={`${
                    index == roomCurrentIndex ? 'w-4 bg-main1' : 'w-2 bg-disabled'
                  } h-2 rounded-full`}
                />
              ))}
            </View>
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
