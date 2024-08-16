import React, { useState } from 'react';
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { loggedInState, profileState } from '@recoil/recoil';

import { deleteMember, signOut } from '@server/api/member';

import { MyPageScreenProps } from '@type/param/loginStack';

import { deleteToken } from '@utils/token';
import Config from 'react-native-config';

import RightArrow from '@assets/myPage/rightArrow.svg';

const MyPageScreen = ({ navigation }: MyPageScreenProps) => {
  const [myProfile, setMyProfile] = useRecoilState(profileState);
  const [, setLoggedIn] = useRecoilState(loggedInState);

  const logout = async () => {
    const response = await signOut();

    console.log(response);

    await deleteToken();
    setLoggedIn(false);
  };

  const withdraw = async () => {
    const response = await deleteMember();

    console.log(response);

    await deleteToken();
    setLoggedIn(false);
  };

  const toMain = () => {
    navigation.navigate('MainScreen');
  };

  const [upItems, setUpItems] = useState([
    {
      id: 1,
      title: '나의 코지룸',
      value: '피그말리온',
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
      pressFunc: toMain,
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
      <View className="flex-1 flex flex-col items-center mt-[52px] px-5">
        <Image
          source={{
            uri: `${Config.S3_IMAGE_URL}/persona/png/${myProfile.persona}.png`,
          }}
          style={{ width: 120, height: 120 }}
          resizeMode="cover"
        />

        <Text className="mt-3 mb-10 text-lg font-semibold text-emphasizedFont">
          {myProfile.nickname}
        </Text>

        <View className="border-[1px] border-[#f1f2f4] flex flex-col w-full p-4 py-1 rounded-xl mb-4">
          {upItems.map((item) => (
            <Pressable
              key={item.id}
              onPress={item.pressFunc}
              className={`border-b-[1px] border-b-[#f1f2f4] py-3 flex flex-row justify-between ${
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

        <View className="border-[1px] border-[#f1f2f4] flex flex-col w-full p-4 py-1 rounded-xl mb-4">
          {downItems.map((item) => (
            <Pressable
              key={item.id}
              onPress={item.pressFunc}
              className={`border-b-[1px] border-b-[#f1f2f4] py-3 flex flex-row justify-between ${
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

          <View className="w-[1px] h-[18px] bg-[#d9d9d9] mx-4" />

          <Pressable onPress={withdraw}>
            <Text className="px-1 py-3 text-xs font-medium text-disabledFont">회원탈퇴</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyPageScreen;
