import React, { useState } from 'react';
import { Text, LayoutChangeEvent } from 'react-native';
import { View, Pressable, Dimensions } from 'react-native';

import CreateRoomModal from '@components/cozyHome/createRoomModal';
import TwoButtonModal from '@components/commonComponents/twoButtonModal';

import { useHasRoomStore } from '@zustand/room/room';
import { useIsVerifiedStore } from '@zustand/member/member';
import { useHasLifeStyleStore } from '@zustand/member-stat/member-stat';

import { CozyHomeScreenProps } from '@type/param/stack';

import HomeBack from '@assets/cozyHome/homeBack.svg';
import ChatIcon from '@assets/cozyHome/chatIcon.svg';
import MegaPhoneIcon from '@assets/cozyHome/megaPhone.svg';
import BlueSchool from '@assets/cozyHome/blueSchoolIcon.svg';
import NotificationIcon from '@assets/cozyHome/notificationIcon.svg';

interface HeaderComponentProps {
  navigation: CozyHomeScreenProps['navigation'];
  handleLayout: (event: LayoutChangeEvent) => void;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ navigation, handleLayout }) => {
  const { myRoom } = useHasRoomStore();
  const { hasLifeStyle } = useHasLifeStyleStore();
  const { isVerified } = useIsVerifiedStore();

  const width = Dimensions.get('screen').width;

  // 방 만들기 시 방 타입 선택 모달
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState<boolean>(false);

  const handleCreateRoomModal = () => {
    setIsCreateRoomOpen(!isCreateRoomOpen);
  };

  const [isNoLifeStyleModalOpen, setIsNoLifeStyleModalOpen] = useState<boolean>(false);

  const [isNotVerifiedModalOpen, setIsNotVerifiedModalOpen] = useState<boolean>(false);

  // 쪽지
  const toChat = () => {
    navigation.navigate('ChatScreen');
  };

  // 알림
  const toNotification = () => {
    navigation.navigate('NotificationScreen');
  };

  // 라이프스타일 온보딩
  const toLifeStyleOnboarding = () => {
    navigation.navigate('LifeStyleOnboardingScreen');
  };

  // 공개방 생성 이동 로직
  const toCreatePublicRoom = () => {
    if (!isVerified) {
      // 학교 인증 X
      setIsCreateRoomOpen(false);
      setIsNotVerifiedModalOpen(true);
    } else if (!hasLifeStyle) {
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
    <View className="bg-sub1">
      <View className="flex pt-[18px]" onLayout={handleLayout}>
        <HomeBack width={width} style={{ position: 'absolute' }} />
        <View style={{ position: 'relative', zIndex: 100 }}>
          <View className="mb-3 flex flex-row items-center justify-between px-5">
            <View className="flex flex-row items-center py-2">
              <View className="flex flex-row items-center space-x-1.5">
                <BlueSchool />
                <Text className="text-lg font-semibold text-[#5B9CFF]">인하대학교</Text>
              </View>
            </View>

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
          setIsNotVerifiedModalOpen(false);
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
          setIsNotVerifiedModalOpen(false);
          toLifeStyleOnboarding();
        }}
      />
    </View>
  );
};

export default HeaderComponent;
