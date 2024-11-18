import { ErrorBoundary } from 'react-error-boundary';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState, Suspense, useEffect, useCallback } from 'react';
import {
  Text,
  View,
  Pressable,
  ScrollView,
  Dimensions,
  SafeAreaView,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import LoadingComponent from '@components/loading/loading';
import Advertisement from '@components/common/advertisement';
import MyRoomComponent from '@components/cozyHome/myRoomComponent';
import CreateRoomModal from '@components/cozyHome/createRoomModal';
import RequestRoomComponent from '@components/cozyHome/requestRoomComponent';
import RecommendationSection from '@components/cozyHome/recommendationSection';
import RecommendRoomComponent from '@components/cozyHome/recommendRoomComponent';
import SameAnswerUserComponent from '@components/cozyHome/sameAnswerUserComponent';

import { useProfileStore } from '@zustand/member/member';
import { useHasRoomStore, useRoomInfoStore } from '@zustand/room/room';

import { useGetRequestRooms } from '@hooks/api/room';
import { useGetMemberList } from '@hooks/api/member-stat';
import { useGetRandomRoom } from '@hooks/api/room-recommend';

import { CozyHomeScreenProps } from '@type/param/stack';
import { RoomItem, UserItem } from '@type/cozyHome/cozyHome';

import HomeBack from '@assets/cozyHome/homeBack.svg';
import ChatIcon from '@assets/cozyHome/chatIcon.svg';
import MegaPhoneIcon from '@assets/cozyHome/megaPhone.svg';
import ArrowIcon from '@assets/cozyHome/rightGrayArrow.svg';
import GraySchool from '@assets/cozyHome/graySchoolIcon.svg';
import BlueSchool from '@assets/cozyHome/blueSchoolIcon.svg';
import NotificationIcon from '@assets/cozyHome/notificationIcon.svg';

const CozyHome = ({ navigation }: CozyHomeScreenProps) => {
  const width = Dimensions.get('screen').width;

  const { bottom } = useSafeAreaInsets();

  const { profile } = useProfileStore();
  const { myRoom } = useHasRoomStore();
  const { roomInfo } = useRoomInfoStore();

  const { data: requestRoomList } = useGetRequestRooms();
  const { data: userList } = useGetMemberList();
  const { data: roomList } = useGetRandomRoom(5);

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

  const handleCreateRoomModal = () => {
    setCreateRoomOpen(!createRoomOpen);
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

  const toUserDetail = (user: UserItem) => {
    navigation.navigate('UserDetailScreen', { memberId: user.memberDetail.memberId });
  };

  const toRoomDetail = (roomId: number) => {
    navigation.navigate('RoomDetailScreen', { roomId: roomId });
  };

  const toSchoolAuthentication = () => {
    navigation.navigate('SchoolAuthenticationScreen', { isVerified: false });
  };

  return (
    <>
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
              <HomeBack width={width} style={{ position: 'absolute' }} />
              <View style={{ position: 'relative', zIndex: 100 }}>
                <View className="mb-[8.5px] flex flex-row items-center justify-between pl-5">
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

                  <View className="flex flex-row pr-5">
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
                  <View className="mb-6 flex h-[100px] w-full flex-row justify-between">
                    <Pressable
                      onPress={handleCreateRoomModal}
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
            {myRoom.hasRoom && roomInfo && (
              <>
                <View className="px-5">
                  <Text className="mb-4 px-1 text-lg font-semibold leading-6 text-emphasizedFont">
                    {profile.nickname}님이{'\n'}현재 참여하고 있는 방이에요
                  </Text>

                  <MyRoomComponent
                    roomData={roomInfo}
                    toRoom={() => toRoomDetail(roomInfo.roomId)}
                  />
                </View>

                <View className="my-6 h-2.5 bg-[#F7F9FA]" />
              </>
            )}

            {!myRoom.hasRoom && (
              <View className="px-5">
                <Text className="mb-4 px-1 text-lg font-semibold leading-6 text-emphasizedFont">
                  {profile.nickname}님이{'\n'}참여요청한 방 목록이에요
                </Text>
                <View className="flex flex-col">
                  {requestRoomList?.result.map((data, index) => (
                    <RequestRoomComponent
                      key={index}
                      index={index}
                      length={requestRoomList?.result.length}
                      roomData={data}
                      pressFunc={() => toRoomDetail(data.roomId)}
                    />
                  ))}
                </View>
                <View className="my-6 h-2.5 bg-[#F7F9FA]" />
              </View>
            )}

            <RecommendationSection<UserItem>
              title={`${profile.nickname}님과\n꼭 맞는 룸메이트를 추천해드릴게요`}
              onPressMore={toRoomMate}
              dataList={userList.result.memberList}
              onScrollHandler={handleSameAnswerUserScroll}
              snapToInterval={userComponentWidth}
              renderItem={(data, index, onLayout) => (
                <SameAnswerUserComponent
                  key={index}
                  userData={data}
                  onLayout={onLayout}
                  pressFunc={() => toUserDetail(data)}
                />
              )}
              onLayout={onLayoutUser}
              currentIndex={userCurrentIndex}
            />

            <View className="my-6 h-2.5 bg-[#F7F9FA]" />

            <RecommendationSection<RoomItem>
              title={`${profile.nickname}님과\n꼭 맞는 방을 추천해드릴게요`}
              onPressMore={toRecommendRoom}
              dataList={roomList.result.recommendations}
              onScrollHandler={handleRecommendRoomScroll}
              snapToInterval={roomComponentWidth}
              renderItem={(data, index, onLayout) => (
                <RecommendRoomComponent
                  key={index}
                  roomData={data}
                  onLayout={onLayout}
                  pressFunc={() => toRoomDetail(data.roomId)}
                />
              )}
              onLayout={onLayoutRoom}
              currentIndex={roomCurrentIndex}
            />

            <View className="h-[25px]" />

            <Advertisement />
          </View>

          {createRoomOpen && (
            <CreateRoomModal
              createPublic={toCreatePublicRoom}
              createPrivate={toCreatePrivateRoom}
              close={handleCreateRoomModal}
            />
          )}
        </ScrollView>
      </View>
    </>
  );
};

const CozyHomeScreen = ({ navigation, route }: CozyHomeScreenProps) => {
  return (
    <ErrorBoundary fallback={<Text>Error loading CozyHome</Text>}>
      <CozyHome navigation={navigation} route={route} />
    </ErrorBoundary>
  );
};

export default CozyHomeScreen;
