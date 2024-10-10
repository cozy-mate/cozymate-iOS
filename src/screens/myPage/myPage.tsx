import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Text, View, Image, Pressable, ScrollView, SafeAreaView } from 'react-native';

import { profileState, loggedInState, roomInfoState } from '@recoil/recoil';

import { signOut, deleteMember } from '@server/api/member';

import { deleteToken } from '@utils/token';
import { deleteFcmToken } from '@utils/fcm';
import { getProfileImage } from '@utils/profileImage';

import { MyPageScreenProps } from '@type/param/stack';

import RightArrow from '@assets/myPage/rightArrow.svg';

const MyPageScreen = ({ navigation }: MyPageScreenProps) => {
  const myProfile = useRecoilValue(profileState);
  const roomInfo = useRecoilValue(roomInfoState);
  const [, setLoggedIn] = useRecoilState(loggedInState);

  const logout = async () => {
    try {
      const response = await signOut();

      console.log(response);

      await deleteToken();
      await deleteFcmToken();
      setLoggedIn(false);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const withdraw = async () => {
    try {
      const response = await deleteMember();

      console.log(response);

      await deleteToken();
      await deleteFcmToken();
      setLoggedIn(false);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  const toMain = () => {
    navigation.navigate('MainScreen');
  };

  const toLifeStyleOnboarding = () => {
    navigation.navigate('LifeStyleOnboardingScreen');
  };

  const [upItems, setUpItems] = useState([
    {
      id: 1,
      title: '나의 코지룸',
      value: roomInfo.name !== '' ? roomInfo.name : '아직 활성화된 방이 없어요',
      pressFunc: toMain,
    },
    {
      id: 2,
      title: '학교 인증',
      value: '인하대학교',
      pressFunc: toMain,
    },
    {
      id: 3,
      title: '나의 라이프스타일 편집',
      value: '',
      pressFunc: toLifeStyleOnboarding,
    },
    {
      id: 4,
      title: '코지메이트 신청 및 수락 내역',
      value: '',
      pressFunc: toMain,
    },
    {
      id: 5,
      title: '내가 찜한 룸메이트',
      value: '',
      pressFunc: toMain,
    },
  ]);

  const [downItems, setDownItems] = useState([
    {
      id: 1,
      title: '문의하기',
      value: '',
      pressFunc: toMain,
    },
    {
      id: 2,
      title: '신고하기',
      value: '',
      pressFunc: toMain,
    },
  ]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-5 pt-[52px]">
        <View className="flex flex-1 flex-col items-center">
          {getProfileImage(myProfile.persona, 120, 120)}
          <Text className="mb-10 mt-3 text-lg font-semibold text-emphasizedFont">
            {myProfile.nickname}
          </Text>

          <View className="mb-4 flex w-full flex-col rounded-xl border border-[#f1f2f4] p-4 py-1">
            {upItems.map((item) => (
              <Pressable
                key={item.id}
                onPress={item.pressFunc}
                className={`flex flex-row justify-between border-b border-b-[#f1f2f4] py-3 ${
                  item.id == upItems.length && 'border-b-0'
                }`}
              >
                <Text className="text-sm font-medium text-emphasizedFont">{item.title}</Text>
                <View className="flex flex-row items-center">
                  <Text className="mr-1 text-sm font-medium text-main1">{item.value}</Text>
                  <RightArrow />
                </View>
              </Pressable>
            ))}
          </View>

          <View className="mb-4 flex w-full flex-col rounded-xl border border-[#f1f2f4] p-4 py-1">
            {downItems.map((item) => (
              <Pressable
                key={item.id}
                onPress={item.pressFunc}
                className={`flex flex-row justify-between border-b border-b-[#f1f2f4] py-3 ${
                  item.id == downItems.length && 'border-b-0'
                }`}
              >
                <Text className="text-sm font-medium text-emphasizedFont">{item.title}</Text>
                <RightArrow />
              </Pressable>
            ))}
          </View>

          <View className="flex flex-row items-center justify-center">
            <Pressable onPress={logout}>
              <Text className="px-1 py-3 text-xs font-medium text-disabledFont">로그아웃</Text>
            </Pressable>

            <View className="mx-4 h-[18px] w-px bg-[#d9d9d9]" />

            <Pressable onPress={withdraw}>
              <Text className="px-1 py-3 text-xs font-medium text-disabledFont">회원탈퇴</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyPageScreen;
