import React, { useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { Text, View, Pressable, SafeAreaView } from 'react-native';

import useFcm from '@hooks/useFcm';
// import { useIsOldiPhone } from '@hooks/device';
import { useAppleLogin, useKakaoLogin } from '@hooks/api/member';

import { SignInScreenProps } from '@type/param/rootStack';

import KakaoLogo from '@assets/signIn/kakaoLogo.svg';
import AppleLogo from '@assets/signIn/appleLogo.svg';

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  // const isOldiPhone = useIsOldiPhone();

  const { getDeviceId, resetFcmToken } = useFcm();

  useEffect(() => {
    // 같은 디바이스면 같은 값을 내는 순수 함수
    getDeviceId();
    resetFcmToken();
  }, [getDeviceId, resetFcmToken]);

  const { mutateAsync: kakaoLogin } = useKakaoLogin(navigation);
  const { mutateAsync: appleLogin } = useAppleLogin(navigation);

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
