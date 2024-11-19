import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { Text, View, Pressable, SafeAreaView } from 'react-native';

import { useHasRoomStore, useRoomInfoStore } from '@zustand/room/room';
import { useProfileStore, useLoggedInStore } from '@zustand/member/member';
import {
  useLifeStyleStore,
  usePreferencesStore,
  useHasLifeStyleStore,
} from '@zustand/member-stat/member-stat';

import { signIn, getMyProfile } from '@server/api/member';
import { getMemberStatData } from '@server/api/member-stat';
import { getRoomData, checkHasRoom } from '@server/api/room';
import { getPreferenceList } from '@server/api/member-stat-preference';

import useFcm from '@hooks/useFcm';
// import { useIsOldiPhone } from '@hooks/device';
import { useAppleLogin, useKakaoLogin } from '@hooks/api/member';

import { setAccessToken, setRefreshToken } from '@utils/token';

import { SignInScreenProps } from '@type/param/rootStack';

import KakaoLogo from '@assets/signIn/kakaoLogo.svg';
import AppleLogo from '@assets/signIn/appleLogo.svg';

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  // const isOldiPhone = useIsOldiPhone();

  // 로그인 정보
  const { setLoggedIn } = useLoggedInStore();
  // 프로필 정보
  const { setProfile } = useProfileStore();
  const { setPreferenceList } = usePreferencesStore();
  // 방 여부 및 방 정보
  const { setMyRoom } = useHasRoomStore();
  const { setRoomInfo } = useRoomInfoStore();
  // 라이프스타일 여부 및 라이프스타일 정보
  const { setHasLifeStyle } = useHasLifeStyleStore();
  const { setLifeStyle } = useLifeStyleStore();

  const { getDeviceId, resetFcmToken } = useFcm();

  useEffect(() => {
    // 같은 디바이스면 같은 값을 내는 순수 함수
    getDeviceId();
    resetFcmToken();
  }, [getDeviceId, resetFcmToken]);

  const { mutateAsync: kakaoLogin } = useKakaoLogin(navigation);
  const { mutateAsync: appleLogin } = useAppleLogin(navigation);

  const test = async () => {
    const response = await signIn({
      clientId: 'OGZmNDU5ZDktYjMwYi00YzQwLWEzMGUtN2IwMTkwMGYyMGMx',
      socialType: 'KAKAO',
    });

    const { accessToken, refreshToken } = response.result.tokenResponseDTO;

    // 로그인 시도 후 기존 회원이면 accessToken / 신규 회원이면 임시 accessToken
    await setAccessToken(accessToken);
    await setRefreshToken(refreshToken);

    // 프로필 정보 저장
    const getProfileResponse = await getMyProfile();
    setProfile(getProfileResponse.result);

    const preferenceResponse = await getPreferenceList();
    setPreferenceList(preferenceResponse.result.preferenceList);

    // 방 존재 여부 저장
    const roomCheckResponse = await checkHasRoom();
    const roomId = roomCheckResponse.result.roomId;

    // 방이 존재하는 경우 방 정보 저장
    if (roomId !== 0) {
      setMyRoom({ hasRoom: true, roomId: roomId });

      const roomInfoResponse = await getRoomData(roomId);
      setRoomInfo(roomInfoResponse.result);
    }

    // getUserDetailData 호출 및 라이프스타일 정보 처리
    try {
      const userDetailResponse = await getMemberStatData();
      setHasLifeStyle(true);
      setLifeStyle(userDetailResponse.result);
    } catch (error: any) {
      const errorCode = error?.response?.data?.code;
      if (errorCode === 'MEMBERSTAT402') {
        setHasLifeStyle(false);
      } else {
        // 예상하지 못한 에러 처리
        console.error(error);
      }
    }

    setLoggedIn(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mx-6 flex flex-1 flex-col justify-between">
        <View className="mx-auto">
          <View className="mt-[58px]">
            <LottieView
              source={require('@assets/onboarding.json')}
              style={{ width: 300, height: 300 }}
              progress={0.5}
              autoPlay={true}
              loop={true}
            />
          </View>
        </View>

        <View className="mx-3 mb-[57px] flex flex-col space-y-3">
          <Pressable
            className="flex-row items-center justify-center rounded-[33px] bg-kakaoyellow px-6 py-4"
            onPress={() => kakaoLogin()}
          >
            <KakaoLogo className="mr-2" />
            <Text className="text-base font-semibold text-black">카카오톡으로 계속하기</Text>
          </Pressable>

          <Pressable
            className="flex-row items-center justify-center rounded-[33px] bg-appleblack px-6 py-4"
            onPress={() => appleLogin()}
          >
            <AppleLogo className="mr-4" />
            <Text className="text-center text-base font-semibold text-white">Apple로 계속하기</Text>
          </Pressable>

          <Pressable
            className="flex-row items-center justify-center rounded-[33px] bg-main1 px-6 py-4"
            onPress={test}
          >
            <Text className="text-center text-base font-semibold text-white">테스트 회원가입</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
