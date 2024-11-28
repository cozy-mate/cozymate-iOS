import { ErrorBoundary } from 'react-error-boundary';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, {
  useState,
  Suspense, //useCallback
} from 'react';
import {
  Text,
  View,
  Pressable,
  ScrollView,
  Dimensions,
  SafeAreaView,
  // RefreshControl,
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
import TwoButtonModal from '@components/commonComponents/twoButtonModal';
import RequestRoomsComponent from '@components/cozyHome/requestRoomComponent';
import RequestUsersComponent from '@components/cozyHome/requestUserComponent';

import { useHasRoomStore, useRoomInfoStore } from '@zustand/room/room';
import { useHasLifeStyleStore } from '@zustand/member-stat/member-stat';
import { useProfileStore, useIsVerifiedStore } from '@zustand/member/member';

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

  // const [refreshing, setRefreshing] = useState<boolean>(false);
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

  const { profile } = useProfileStore();
  const { myRoom } = useHasRoomStore();
  const { roomInfo } = useRoomInfoStore();
  const { hasLifeStyle } = useHasLifeStyleStore();
  const { isVerified } = useIsVerifiedStore();

  const { data: requestRoomList } = useGetRequestRooms();
  const { data: requestMemberList } = useGetRoomRequests();
  const { data: userList } = useGetMemberList();
  const { data: roomList } = useGetRandomRoom(5, 0);

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   refetchMemberList();
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000); // 예시로 2초 후 새로고침 완료
  // }, []);

  // 쪽지
  const toChat = () => {
    navigation.navigate('ChatScreen');
  };

  // 알림
  const toNotification = () => {
    navigation.navigate('NotificationScreen');
  };

  const toSchoolAuthentication = () => {
    navigation.navigate('SchoolAuthenticationScreen', { verified: Boolean(isVerified) });
  };

  const toLifeStyleOnboarding = () => {
    navigation.navigate('LifeStyleOnboardingScreen');
  };

  // 방 만들기 시 방 타입 선택 모달
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState<boolean>(false);

  const handleCreateRoomModal = () => {
    setIsCreateRoomOpen(!isCreateRoomOpen);
  };

  const [isNoLifeStyleModalOpen, setIsNoLifeStyleModalOpen] = useState<boolean>(false);

  const [isNotVerifiedModalOpen, setIsNotVerifiedModalOpen] = useState<boolean>(false);

  // 공개방 생성 이동 로직
  const toCreatePublicRoom = () => {
    if (!isVerified) {
      // 학교 인증 X
      setIsCreateRoomOpen(false);
      setIsNotVerifiedModalOpen(true);
    } else if (hasLifeStyle) {
      // 학교 인증 O & 라이프 스타일 입력 X
      setIsCreateRoomOpen(false);
      setIsNoLifeStyleModalOpen(true);
    } else {
      // 학교 인증 O & 라이프 스타일 입력 O
      setIsCreateRoomOpen(false);
      navigation.navigate('CreateRoomScreen', { type: 'PUBLIC' });
    }
  };

  // 비공개방 생성 이동 로직
  const toCreatePrivateRoom = () => {
    setIsCreateRoomOpen(false);
    navigation.navigate('CreateRoomScreen', { type: 'PRIVATE' });
  };

  // 방 참여하기 이동 로직
  const toJoinRoom = () => {
    navigation.navigate('JoinRoomScreen');
  };

  return (
    <View className="flex-1 bg-sub1">
      <SafeAreaView
        style={{
          backgroundColor: scrollY <= height ? '#CADFFF' : 'white',
        }}
      />
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
        // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <View className="bg-white">
          <View className="flex bg-sub1 pt-[18px]" onLayout={handleLayout}>
            <HomeBack width={width} style={{ position: 'absolute' }} />
            <View style={{ position: 'relative', zIndex: 100 }}>
              <View className="mb-3 flex flex-row items-center justify-between px-5">
                {isVerified !== '' ? (
                  <Pressable
                    className="flex flex-row items-center py-2"
                    onPress={toSchoolAuthentication}
                  >
                    <View className="flex flex-row items-center space-x-1.5">
                      <BlueSchool />
                      <Text className="text-lg font-semibold text-[#5B9CFF]">
                        {profile.universityName}
                      </Text>
                    </View>
                  </Pressable>
                ) : (
                  <Pressable
                    className="flex flex-row items-center py-2"
                    onPress={toSchoolAuthentication}
                  >
                    <View className="flex flex-row items-center space-x-1.5">
                      <GraySchool />
                      <View className="flex flex-row items-center space-x-1">
                        <Text className="text-lg font-semibold text-disabledFont">
                          학교 인증을 해주세요
                        </Text>
                        <ArrowIcon />
                      </View>
                    </View>
                  </Pressable>
                )}

                <View className="flex flex-row">
                  <Pressable onPress={toChat} className="py-2.5 pl-[17px] pr-[3px]">
                    <ChatIcon />
                  </Pressable>
                  <Pressable onPress={toNotification} className="py-2.5 pl-[19px] pr-[3px]">
                    <NotificationIcon />
                  </Pressable>
                </View>
              </View>
              <View className="flex flex-col items-start px-5">
                <View className="mb-3 flex w-full flex-row space-x-2 rounded-lg bg-colorBox px-2 py-1.5">
                  <View className="p-[1.6px]">
                    <MegaPhoneIcon />
                  </View>
                  <Text className="text-xs font-medium text-emphasizedFont">
                    [공지] 시험기간으로 인한 기숙사 통금시간 변경
                  </Text>
                </View>

                {/* 초대코드로 방 만들기 & 방 참여하기 버튼 */}
                <View className="mb-6 flex h-[100px] flex-row space-x-3">
                  <Pressable
                    onPress={handleCreateRoomModal}
                    disabled={myRoom.hasRoom}
                    className="flex-1 items-start rounded-xl bg-colorBox pl-4 pt-4"
                  >
                    <Text
                      className={`text-base font-semibold leading-[19px] ${
                        myRoom.hasRoom ? 'text-disabledFont' : 'text-main1'
                      }`}
                    >
                      방 만들기
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={toJoinRoom}
                    disabled={myRoom.hasRoom}
                    className="flex-1 items-start rounded-xl bg-colorBox pl-4 pt-4"
                  >
                    <Text
                      className={`text-base font-semibold leading-[19px] ${
                        myRoom.hasRoom ? 'text-disabledFont' : 'text-main1'
                      }`}
                    >
                      방 참여하기
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View className="bg-white pt-6" style={{ paddingBottom: bottom + 80 }}>
          {/* 방이 없는 사용자에 대하여 참여 요청한 방 목록 컴포넌트 */}
          {!myRoom.hasRoom &&
            requestRoomList !== undefined &&
            requestRoomList?.result.length !== 0 && (
              <>
                <RequestRoomsComponent navigation={navigation} roomList={requestRoomList?.result} />

                <View className="my-6 h-2.5 bg-[#F7F9FA]" />
              </>
            )}

          {/* 방이 있는 사용자에 대하여 본인 방 컴포넌트 */}
          {myRoom.hasRoom && roomInfo && (
            <>
              <MyRoomComponent navigation={navigation} roomData={roomInfo} />

              <View className="my-6 h-2.5 bg-[#F7F9FA]" />
            </>
          )}

          {/* 방장인 사용자에 대하여 참여 요청한 사용자 목록 컴포넌트 */}
          {myRoom.hasRoom &&
            requestMemberList !== undefined &&
            requestMemberList.result.length !== 0 &&
            roomInfo.isRoomManager && (
              <>
                <RequestUsersComponent
                  navigation={navigation}
                  userList={requestMemberList?.result}
                />

                <View className="my-6 h-2.5 bg-[#F7F9FA]" />
              </>
            )}

          {/* 룸메이트 추천 컴포넌트 */}
          <RecommendUserList navigation={navigation} users={userList.result.memberList} />

          <View className="my-6 h-2.5 bg-[#F7F9FA]" />

          {/* 방 추천 컴포넌트 */}
          <RecommendRoomList navigation={navigation} rooms={roomList.result.result} />

          <View className="h-[25px]" />

          {/* 광고 컴포넌트 */}
          <Advertisement />
        </View>

        {/* 방 생성 시 방 타입 선택 모달 */}
        <CreateRoomModal
          isVisible={isCreateRoomOpen}
          createPublic={toCreatePublicRoom}
          createPrivate={toCreatePrivateRoom}
          close={() => setIsCreateRoomOpen(false)}
        />

        {/* 학교 미인증 유저에 대한 학교 인증 유도 모달 */}
        <TwoButtonModal
          isVisible={isNotVerifiedModalOpen}
          title={`방을 만들려면\n먼저 학교인증을 해야해요!`}
          closeFunc={() => setIsNotVerifiedModalOpen(false)}
          leftButtonText="안할래요"
          leftButtonFunc={() => setIsNotVerifiedModalOpen(false)}
          rightButtonText="할래요"
          rightButtonFunc={() => {
            setIsNoLifeStyleModalOpen(false);
            setIsCreateRoomOpen(false);
            toSchoolAuthentication();
          }}
        />

        {/* 라이프 스타일 미입력 유저에 대한 라이프 스타일 입력 유도 모달 */}
        <TwoButtonModal
          isVisible={isNoLifeStyleModalOpen}
          title={`방을 만들려면\n라이프스타일을 입력해야해요!`}
          closeFunc={() => setIsNoLifeStyleModalOpen(false)}
          leftButtonText="안할래요"
          leftButtonFunc={() => setIsNoLifeStyleModalOpen(false)}
          rightButtonText="할래요"
          rightButtonFunc={() => {
            setIsNoLifeStyleModalOpen(false);
            setIsCreateRoomOpen(false);
            toLifeStyleOnboarding();
          }}
        />
      </ScrollView>
    </View>
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
