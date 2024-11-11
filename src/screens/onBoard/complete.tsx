import React from 'react';
import { Text, View, Pressable, SafeAreaView } from 'react-native';

import { useSignUpStore, useLoggedInStore } from '@zustand/member/member';

import { getProfileImage } from '@utils/profileImage';

const CompleteScreen = () => {
  const { signUpState } = useSignUpStore();
  const { setLoggedIn } = useLoggedInStore();

  const toMain = () => {
    setLoggedIn(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-1 flex-col justify-between px-5">
        {/* 상단 View */}
        <View className="mt-14 flex">
          {/* 설명 Text */}
          <View className="mb-[108px] leading-loose">
            <Text className="text-xl font-semibold leading-5 tracking-tight text-emphasizedFont">
              <Text className="text-main1">{signUpState.nickname}</Text>님,{'\n'}cozymate에 오신걸
              환영해요!
            </Text>
          </View>

          {/* 선택된 캐릭터 이미지 */}
          <View className="flex items-center">
            {getProfileImage(signUpState.persona, 300, 300)}
          </View>
        </View>

        {/* 하단 View */}
        <View className="flex">
          <Pressable onPress={toMain}>
            <View className="rounded-xl bg-main1 p-4">
              <Text className="text-center text-base font-semibold text-white">
                cozymate 바로가기
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CompleteScreen;
