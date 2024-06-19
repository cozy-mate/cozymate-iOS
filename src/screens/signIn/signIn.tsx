import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';

import KakaoLogo from '@assets/signIn/kakaoLogo.svg';
import AppleLogo from '@assets/signIn/appleLogo.svg';
import { SignInScreenProps } from '@type/param/stack';

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const toOnBoard = () => {
    navigation.navigate('OnBoardScreen');
  };

  const toRoomMate = () => {
    navigation.navigate('RoomMateScreen');
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="mx-6 flex-1">
        {/*로고*/}
        <View className="flex-1 items-center justify-center">
          <Text className="text-5xl">cozymate</Text>
        </View>

        <View className="mx-3 mb-4">
          <Pressable
            className="flex-row items-center rounded-[33px] bg-kakaoyellow px-[96px] py-[14px]"
            onPress={toOnBoard}
          >
            <KakaoLogo className="mr-2" />
            <Text className="text-center text-black opacity-85 font-semibold">
              카카오로 계속하기
            </Text>
          </Pressable>
        </View>

        <View className="mx-3 mb-4">
          <Pressable
            className="flex-row items-center rounded-[33px] bg-navergreen px-[96px] py-[14px]"
            onPress={toRoomMate}
          >
            <Text className="text-center text-black opacity-85 font-semibold">
              네이버로 계속하기
            </Text>
          </Pressable>
        </View>

        <View className="mx-3 mb-11">
          <Pressable className="flex-row items-center rounded-[33px] bg-appleblack px-[96px] py-[14px]">
            <AppleLogo className="mr-2" />
            <Text className="text-center text-button-black-text font-semibold">
              Apple로 계속하기
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
