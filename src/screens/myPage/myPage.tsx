import { ErrorBoundary } from 'react-error-boundary';
import React, { Fragment, Suspense, useState } from 'react';
import { Text, View, Pressable, ScrollView, Dimensions } from 'react-native';

import LogoutModal from '@components/myPage/logoutModal';
import LoadingComponent from '@components/loading/loading';

import { useHasRoomStore, useRoomInfoStore } from '@zustand/room/room';
import { useProfileStore, useLoggedInStore, useIsVerifiedStore } from '@zustand/member/member';
import {
  useLifeStyleStore,
  usePreferencesStore,
  useHasLifeStyleStore,
} from '@zustand/member-stat/member-stat';

import { useCheckHasInquiry } from '@hooks/api/inquiry';

import { deleteToken } from '@utils/token';
import { getProfileImage } from '@utils/profileImage';

import { MyPageScreenProps } from '@type/param/stack';

import HomeIcon from '@assets/myPage/home.svg';
import Background from '@assets/myPage/background.svg';
import RightArrow from '@assets/myPage/rightArrow.svg';
import CertificationIcon from '@assets/myPage/certification.svg';
import { deactivateFcmToken } from '@utils/fcm/fcmTokenUtil';

const MyPage = ({ navigation }: MyPageScreenProps) => {
  const width = Dimensions.get('screen').width;

  // 로그인 상태
  const { setLoggedIn } = useLoggedInStore();
  const { myRoom, clearMyRoom } = useHasRoomStore();
  const { profile, clearProfile } = useProfileStore();
  const { isVerified, setIsVerified } = useIsVerifiedStore();
  const { clearPreferenceList } = usePreferencesStore();
  const { roomInfo, clearRoomInfo } = useRoomInfoStore();
  const { hasLifeStyle, setHasLifeStyle } = useHasLifeStyleStore();
  const { clearLifeStyle } = useLifeStyleStore();

  const { data: hasInquiry } = useCheckHasInquiry();

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false);

  const handleLogoutModal = () => {
    setIsLogoutModalOpen(!isLogoutModalOpen);
  };

  const toMyInfo = () => {
    navigation.navigate('MyInfoScreen');
  };

  const toRoomDetail = () => {
    navigation.navigate('RoomDetailScreen', { roomId: myRoom.roomId });
  };

  const toSchoolAuthentication = () => {
    navigation.navigate('SchoolAuthenticationScreen', { verified: Boolean(isVerified) });
  };

  const toLifeStyle = () => {
    if (hasLifeStyle) {
      navigation.navigate('LifeStyleEditScreen');
    } else {
      navigation.navigate('LifeStyleOnboardingScreen');
    }
  };

  const toFavorite = () => {
    navigation.navigate('FavoriteUserRoomScreen', { type: 'user' });
  };

  const toInquiry = () => {
    navigation.navigate('InquiryScreen', { hasInquiry: hasInquiry.result });
  };

  const toWithdraw = () => {
    navigation.navigate('WithdrawScreen');
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLogoutModalOpen(false);
      await deleteToken();
      await deactivateFcmToken();

      clearMyRoom();
      clearProfile();
      setIsVerified('');
      clearPreferenceList();
      clearRoomInfo();
      setHasLifeStyle(false);
      clearLifeStyle();

      setLoggedIn(false);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="bg-white" style={{ position: 'relative' }} bounces={false}>
        <Background width={width} style={{ position: 'absolute' }} />
        <View className="flex flex-1 flex-col items-center px-5 pt-[100px]">
          {getProfileImage(profile.persona, 120, 120)}
          <Text className="mb-10 mt-3 text-lg font-semibold text-emphasizedFont">
            {profile.nickname}
          </Text>

          <View className="mb-4 flex w-full flex-col rounded-xl border border-[#f1f2f4] p-4">
            <Pressable
              onPress={toMyInfo}
              className="flex flex-row justify-between border-b border-b-[#f1f2f4] pb-3"
            >
              <Text className="text-sm font-medium text-emphasizedFont">내 정보</Text>
              <View className="flex flex-row items-center">
                <RightArrow />
              </View>
            </Pressable>

            <Pressable
              className="flex flex-row justify-between border-b border-b-[#f1f2f4] py-3"
              onPress={myRoom.hasRoom ? toRoomDetail : null}
            >
              <Text className="text-sm font-medium text-emphasizedFont">나의 코지룸</Text>
              <View className="flex flex-row items-center">
                {myRoom.hasRoom ? (
                  <View className="flex flex-row items-center">
                    <HomeIcon />
                    <Text className="mx-1 text-sm font-medium text-main1">{roomInfo.name}</Text>
                    <RightArrow />
                  </View>
                ) : (
                  <View className="flex flex-row items-center">
                    <Text className="mr-1 text-sm font-medium text-disabledFont">
                      아직 방이 존재하지 않아요
                    </Text>
                    <RightArrow />
                  </View>
                )}
              </View>
            </Pressable>

            <Pressable
              className="flex flex-row justify-between border-b border-b-[#f1f2f4] py-3"
              onPress={toSchoolAuthentication}
            >
              <Text className="text-sm font-medium text-emphasizedFont">학교 인증</Text>
              <View className="flex flex-row items-center">
                {isVerified ? (
                  <Fragment>
                    <CertificationIcon />
                    <Text className="mx-1 text-sm font-medium text-main1">
                      {profile.universityName}
                    </Text>
                    <RightArrow />
                  </Fragment>
                ) : (
                  <Pressable
                    onPress={toSchoolAuthentication}
                    className="flex flex-row items-center"
                  >
                    <Text className="mr-1 text-sm font-medium text-disabledFont">
                      아직 학교인증이 되어있지 않아요
                    </Text>
                    <RightArrow />
                  </Pressable>
                )}
              </View>
            </Pressable>

            <Pressable
              className="flex flex-row justify-between border-b border-b-[#f1f2f4] py-3"
              onPress={toLifeStyle}
            >
              <Text className="text-sm font-medium text-emphasizedFont">나의 라이프스타일</Text>
              <View className="flex flex-row items-center">
                <RightArrow />
              </View>
            </Pressable>

            <Pressable className="flex flex-row justify-between pt-3" onPress={toFavorite}>
              <Text className="text-sm font-medium text-emphasizedFont">내가 찜한 룸메이트</Text>
              <View className="flex flex-row items-center">
                <RightArrow />
              </View>
            </Pressable>
          </View>

          <View className="mb-4 flex w-full flex-col rounded-xl border border-[#f1f2f4] p-4">
            <Pressable className="flex flex-row justify-between" onPress={toInquiry}>
              <Text className="text-sm font-medium text-emphasizedFont">문의하기</Text>
              <RightArrow />
            </Pressable>
          </View>

          <View className="flex flex-row items-center justify-center">
            <Pressable onPress={() => setIsLogoutModalOpen(true)}>
              <Text className="px-1 py-3 text-xs font-medium text-disabledFont">로그아웃</Text>
            </Pressable>

            <View className="mx-4 h-[18px] w-px bg-[#d9d9d9]" />

            <Pressable onPress={toWithdraw}>
              <Text className="px-1 py-3 text-xs font-medium text-disabledFont">회원탈퇴</Text>
            </Pressable>
          </View>
        </View>

        {isLogoutModalOpen && (
          <LogoutModal
            closeModal={handleLogoutModal}
            cancelFunc={handleLogoutModal}
            submitFunc={logout}
          />
        )}
      </ScrollView>
    </View>
  );
};

const MyPageScreen = ({ navigation, route }: MyPageScreenProps) => {
  return (
    <ErrorBoundary
      fallback={
        <View className="h-full w-full flex-1 items-center justify-center">
          <Text>Error loading CozyHome</Text>
        </View>
      }
    >
      <Suspense fallback={<LoadingComponent />}>
        <MyPage navigation={navigation} route={route} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default MyPageScreen;
