import React from 'react';
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { loggedInState, profileState } from '@recoil/recoil';

import { deleteMember, signOut } from '@server/api/member';

import { MyPageScreenProps } from '@type/param/loginStack';

import { deleteToken } from '@utils/token';
import Config from 'react-native-config';

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

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-col items-center mt-[52px]">
        <Image
          source={{
            uri: `${Config.S3_IMAGE_URL}/persona/png/${myProfile.persona}.png`,
          }}
          style={{ width: 120, height: 120 }}
          resizeMode="cover"
        />

        <Text className="mt-3 mb-4 text-lg font-semibold text-emphasizedFont">
          {myProfile.nickname}
        </Text>

        <View className="flex flex-row items-center justify-center">
          <Pressable onPress={logout}>
            <Text className="text-xs font-medium text-disabledFont">로그아웃</Text>
          </Pressable>

          <View className="w-[1px] h-[18px] bg-[#d9d9d9] mx-4" />

          <Pressable onPress={withdraw}>
            <Text className="text-xs font-medium text-disabledFont">회원탈퇴</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MyPageScreen;
