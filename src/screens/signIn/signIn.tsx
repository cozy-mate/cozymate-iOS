import React from 'react';
import { Pressable, Text, View, SafeAreaView } from 'react-native';

import KakaoLogo from '@assets/signIn/kakaoLogo.svg';
import AppleLogo from '@assets/signIn/appleLogo.svg';

import { SignInScreenProps } from '@type/param/rootStack';
import { useRecoilState } from 'recoil';
import { loggedInState } from '@recoil/recoil';

import { login, getProfile } from '@react-native-seoul/kakao-login';
import { signIn } from '@server/api/member';
import { setAccessToken } from '@utils/token';

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  const toOnBoard = () => {
    setLoggedIn(true);
    navigation.navigate('PersonalInfoInputScreen');
  };

  const signInWithKakao = async (): Promise<void> => {
    await login();

    try {
      const result = await getProfile();
      const kakaoId = result.id;

      const response = await signIn({ clientId: kakaoId.toString(), socialType: 'KAKAO' });
      const accessToken = response.result.tokenResponseDTO.accessToken;

      await setAccessToken(accessToken);

      if (response.result.tokenResponseDTO.refreshToken === null) {
        navigation.navigate('PersonalInfoInputScreen');
      } else {
        setLoggedIn(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 mx-6">
        <View className="mx-auto mt-[236px] mb-[224px]">
          <View className="mb-[7px]">
            <Text className="text-[48px] font-normal text-center font-['Cafe24_Meongi_B']">
              <Text className="text-[#FFE28B]">cozy</Text>
              <Text className="text-[#BDD8FF]">mate</Text>
            </Text>
          </View>
          <Text className="text-basicFont text-[13.5px] font-semibold font-['SF_HambakSnow']">
            “룸메이트와 함께 만드는 우리의 편안한 공간”
          </Text>
        </View>

        <View className="mx-3 mb-4">
          <Pressable
            className="flex-row justify-center items-center rounded-[33px] bg-kakaoyellow px-6 py-4"
            onPress={signInWithKakao}
          >
            <KakaoLogo className="mr-2" />
            <Text className="text-base font-semibold text-black opacity-85">
              카카오톡으로 계속하기
            </Text>
          </Pressable>
        </View>

        <View className="mx-3 mb-4">
          <Pressable
            className="flex-row items-center justify-center rounded-[33px] bg-appleblack px-6 py-4"
            onPress={toOnBoard}
          >
            <AppleLogo className="mr-4" />
            <Text className="text-base font-semibold text-center text-white">Apple로 계속하기</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
