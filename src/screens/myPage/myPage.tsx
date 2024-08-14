import React from 'react';
import { Pressable, SafeAreaView, Text } from 'react-native';
import { useRecoilState } from 'recoil';
import { loggedInState } from '@recoil/recoil';

import { signOut } from '@server/api/member';

import { MyPageScreenProps } from '@type/param/loginStack';

import { deleteToken } from '@utils/token';

const MyPageScreen = ({ navigation }: MyPageScreenProps) => {
  const [, setLoggedIn] = useRecoilState(loggedInState);

  const logout = async () => {
    const response = await signOut();

    console.log(response);

    await deleteToken();
    setLoggedIn(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Text>마이페이지입니다.</Text>
      <Pressable onPress={logout}>
        <Text>로그아웃 버튼</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default MyPageScreen;
