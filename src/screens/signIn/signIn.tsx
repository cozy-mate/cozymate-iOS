import React from 'react';
import { Pressable, Text, View, SafeAreaView, Alert } from 'react-native';

import KakaoLogo from '@assets/signIn/kakaoLogo.svg';
import AppleLogo from '@assets/signIn/appleLogo.svg';

import { SignInScreenProps } from '@type/param/rootStack';

import { useKakaoLogin, useLoginWithId } from '@hooks/api/member';

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const { mutateAsync: kakaoLogin, isPending: kakaoLoginPending } = useKakaoLogin(navigation);
  const loginWithId = useLoginWithId(navigation);
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
          <Text className="text-basicFont text-[13.5px] font-semibold">
            “나와 꼭 맞는 룸메이트와 함께 만드는 우리만의 편안한 공간”
          </Text>
        </View>

        <View className="mx-3 mb-4">
          <Pressable
            className="flex-row justify-center items-center rounded-[33px] bg-kakaoyellow px-6 py-4"
            onPress={() => kakaoLogin()}
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
            onPress={() => loginWithId()}
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
