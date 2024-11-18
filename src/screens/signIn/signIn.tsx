import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { Text, View, Pressable, SafeAreaView } from 'react-native';

import { signIn } from '@server/api/member';

import useInitFcm from '@hooks/useInitFcm';
import { useIsOldiPhone } from '@hooks/device';
import { useAppleLogin, useKakaoLogin } from '@hooks/api/member';

import { setAccessToken } from '@utils/token';

import { SignInScreenProps } from '@type/param/rootStack';

import KakaoLogo from '@assets/signIn/kakaoLogo.svg';
import AppleLogo from '@assets/signIn/appleLogo.svg';

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const isOldiPhone = useIsOldiPhone();

  const { getDeviceId, refreshFcmToken } = useInitFcm();

  useEffect(() => {
    // 같은 디바이스면 같은 값을 내는 순수 함수
    getDeviceId();
    refreshFcmToken();
  }, [getDeviceId, refreshFcmToken]);

  const { mutateAsync: kakaoLogin } = useKakaoLogin(navigation);
  const { mutateAsync: appleLogin } = useAppleLogin(navigation);

  const toSignUp = async (): Promise<void> => {
    const signInResponse = await signIn({ clientId: 'TEST', socialType: 'TEST' });

    console.log(signInResponse);

    await setAccessToken(signInResponse.result.tokenResponseDTO.accessToken);

    navigation.navigate('PersonalInfoInputScreen');
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
