import React, { useEffect } from 'react';
import { Text, View, Pressable, SafeAreaView } from 'react-native';

import { useProfileStore, useLoggedInStore } from '@zustand/member/member';
import { useLifeStyleStore, useHasLifeStyleStore } from '@zustand/member-stat/member-stat';

import { signIn, testSignUp } from '@server/api/member';
import { getUserDetailData } from '@server/api/member-stat';

import useInitFcm from '@hooks/useInitFcm';
import { useIsOldiPhone } from '@hooks/device';
import { useKakaoLogin } from '@hooks/api/member';

import { setAccessToken } from '@utils/token';

import { SignInScreenProps } from '@type/param/rootStack';

import KakaoLogo from '@assets/signIn/kakaoLogo.svg';
import AppleLogo from '@assets/signIn/appleLogo.svg';

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const isOldiPhone = useIsOldiPhone();
  const { setLoggedIn } = useLoggedInStore();
  const { setProfile } = useProfileStore();
  const { setHasLifeStyle } = useHasLifeStyleStore();
  const { setLifeStyle } = useLifeStyleStore();

  const { getDeviceId, refreshFcmToken } = useInitFcm();

  useEffect(() => {
    // 같은 디바이스면 같은 값을 내는 순수 함수
    getDeviceId();
    refreshFcmToken();
  }, []);

  const { mutateAsync: kakaoLogin } = useKakaoLogin(navigation);

  const toOnboard = () => {
    navigation.navigate('PersonalInfoInputScreen');
  };

  const testLogin = async (): Promise<void> => {
    try {
      const signInResponse = await signIn({ clientId: 'test', socialType: 'TEST' });
      await setAccessToken(signInResponse.result.tokenResponseDTO.accessToken);

      const signUpResponse = await testSignUp({
        name: '테스트',
        nickname: '테스트',
        gender: 'MALE',
        birthday: '1999-02-13',
        persona: 1,
      });

      await setAccessToken(signUpResponse.result.tokenResponseDTO.accessToken);
      setProfile(signUpResponse.result.memberInfoDTO);

      const response = await getUserDetailData();
      setHasLifeStyle(true);
      setLifeStyle(response.result);
    } catch (error: any) {
      const errorCode = error?.response?.data?.code;

      if (errorCode === 'MEMBERSTAT402') {
        setHasLifeStyle(false);
      } else {
        console.error(error);
      }
    }

    setLoggedIn(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mx-6 flex-1">
        <View
          className={`mx-auto ${isOldiPhone ? 'mb-[100px] mt-[200px]' : 'mb-[200px] mt-[236px]'}`}
        >
          <View className="mb-[7px]">
            <Text
              className="text-center font-['Cafe24_Meongi_B'] text-[48px] font-normal"
              allowFontScaling={false}
            >
              <Text className="text-[#FFE28B]">cozy</Text>
              <Text className="text-[#BDD8FF]">mate</Text>
            </Text>
          </View>
          <Text
            className="text-center text-sm font-semibold text-basicFont"
            allowFontScaling={false}
          >
            “나와 꼭 맞는 룸메이트와 함께 만드는{'\n'}우리만의 편안한 공간”
          </Text>
        </View>

        <View className="mx-3 mb-4">
          <Pressable
            className="flex-row items-center justify-center rounded-[33px] bg-kakaoyellow px-6 py-4"
            onPress={() => kakaoLogin()}
          >
            <KakaoLogo className="mr-2" />
            <Text className="text-base font-semibold text-black">카카오톡으로 계속하기</Text>
          </Pressable>
        </View>

        <View className="mx-3 mb-4">
          <Pressable
            className="flex-row items-center justify-center rounded-[33px] bg-appleblack px-6 py-4"
            onPress={() => toOnboard()}
          >
            <AppleLogo className="mr-4" />
            <Text className="text-center text-base font-semibold text-white">Apple로 계속하기</Text>
          </Pressable>
        </View>

        <Pressable onPress={testLogin}>
          <Text>테스트 로그인</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
