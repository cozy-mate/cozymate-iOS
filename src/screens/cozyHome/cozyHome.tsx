import React, { useState, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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
import RecommendUserList from '@components/cozyHome/recommentUserList';
import RecommendRoomList from '@components/cozyHome/recommendRoomList';
import RequestUserComponent from '@components/cozyHome/requestUserComponent';
import RequestRoomComponent from '@components/cozyHome/requestRoomComponent';

import { useProfileStore } from '@zustand/member/member';
import { useHasRoomStore, useRoomInfoStore } from '@zustand/room/room';

import { useGetMemberList } from '@hooks/api/member-stat';
import { useGetRandomRoom } from '@hooks/api/room-recommend';
import { useGetRequestRooms, useGetRoomRequests } from '@hooks/api/room';

import { CozyHomeScreenProps } from '@type/param/stack';

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
  const { data: requestMemberList } = useGetRoomRequests();
  const { data: userList } = useGetMemberList();
  const { data: roomList } = useGetRandomRoom(5);

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

  const toUserDetail = (memberId: number) => {
    navigation.navigate('UserDetailScreen', { memberId: memberId });
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
          // className="flex-1"
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

            {!myRoom.hasRoom && requestRoomList?.result.length !== 0 && (
              <>
                <View className="px-5">
                  <Text className="mb-4 px-1 text-lg font-semibold leading-6 text-emphasizedFont">
                    {profile.nickname}님이{'\n'}참여요청한 방 목록이에요
                  </Text>
                  <View className="flex flex-col">
                    {requestRoomList?.result.map((data, index) => (
                      <RequestRoomComponent
                        key={index}
                        index={index}
                        length={requestRoomList.result.length}
                        roomData={data}
                        pressFunc={() => toRoomDetail(data.roomId)}
                      />
                    ))}
                  </View>
                </View>

                <View className="my-6 h-2.5 bg-[#F7F9FA]" />
              </>
            )}

            {myRoom.hasRoom && roomInfo.isRoomManager && (
              <>
                <View className="px-5">
                  <Text className="mb-4 px-1 text-lg font-semibold leading-6 text-emphasizedFont">
                    {requestMemberList?.result.length}개의{'\n'}방 참여 요청이 도착했어요
                  </Text>
                  <View className="flex flex-col">
                    {requestMemberList?.result.map((data, index) => (
                      <RequestUserComponent
                        key={data.memberId}
                        index={index}
                        length={requestMemberList?.result.length}
                        userData={data}
                        pressFunc={() => toUserDetail(data.memberId)}
                      />
                    ))}
                  </View>
                </View>

                <View className="my-6 h-2.5 bg-[#F7F9FA]" />
              </>
            )}

            <RecommendUserList
              users={userList.result.memberList}
              toUserDetail={toUserDetail}
              toRoommate={toRoomMate}
            />

            <View className="my-6 h-2.5 bg-[#F7F9FA]" />

            <RecommendRoomList
              rooms={roomList.result.recommendations}
              toRoomDetail={toRoomDetail}
              toRoomRecommend={toRecommendRoom}
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
    <ErrorBoundary
      fallback={
        <View className="h-full w-full flex-1 items-center justify-center">
          <Text>Error loading CozyHome</Text>
        </View>
      }
    >
      <Suspense fallback={<LoadingComponent />}>
        <CozyHome navigation={navigation} route={route} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default CozyHomeScreen;
