import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native';

import LogoImage from '@assets/logo.svg';

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

  const toCreateRoom = () => {
    navigation.navigate('CreateRoomScreen');
  };

  const toUserDetail = () => {
    navigation.navigate('UserDetailScreen');
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 mx-6">
        <View className="items-center justify-center flex-1">
          <View className="flex-row mb-[7px]">
            <Text className="text-[#FFE28B] text-[42px] font-extrabold">cozy</Text>
            <Text className="text-[#BDD8FF] text-[42px] font-extrabold">mate</Text>
          </View>
          <Text className="text-basicFont text-[13.5px] font-semibold">
            “룸메이트와 함께 만드는 나만의 편안한 집”
          </Text>
        </View>

        <View className="mx-3 mb-4">
          <Pressable
            className="flex-row justify-center items-center rounded-[33px] bg-kakaoyellow px-6 py-4"
            onPress={toOnBoard}
          >
            <KakaoLogo className="mr-2" />
            <Text className="font-semibold text-black opacity-85">온보딩 스크린</Text>
          </Pressable>
        </View>

        <View className="mx-3 mb-4">
          <Pressable
            className="flex-row justify-center items-center rounded-[33px] bg-navergreen px-6 py-4"
            onPress={toRoomMate}
          >
            <Text className="font-semibold text-black opacity-85">홈 스크린</Text>
          </Pressable>
        </View>

        <View className="mx-3 mb-4">
          <Pressable
            className="flex-row justify-center items-center rounded-[33px] bg-navergreen px-6 py-4"
            onPress={toRoomMate}
          >
            <Text className="font-semibold text-black opacity-85">룸메이트 스크린</Text>
          </Pressable>
        </View>

        <View className="mx-3 mb-4">
          <Pressable
            className="flex-row items-center rounded-[33px] bg-appleblack px-[96px] py-[14px]"
            onPress={toCreateRoom}
          >
            <AppleLogo className="mr-2" />
            <Text className="font-semibold text-center text-white">방 생성하기 스크린</Text>
          </Pressable>
        </View>

        <View className="mx-3 mb-11">
          <Pressable
            className="flex-row items-center rounded-[33px] bg-appleblack px-[96px] py-[14px]"
            onPress={toUserDetail}
          >
            <AppleLogo className="mr-2" />
            <Text className="font-semibold text-center text-white">상세 스크린</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
