import React from 'react';
import { Text, View, Pressable, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useHasRoomStore } from '@zustand/room/room';
import { useSignUpStore, useProfileStore, useLoggedInStore } from '@zustand/member/member';

import { signUp, getMyProfile } from '@server/api/member';

import { getProfileImage } from '@utils/profileImage';

const CompleteScreen = () => {
  const { signUpState } = useSignUpStore();
  const { setLoggedIn } = useLoggedInStore();
  const { setProfile } = useProfileStore();
  const { setMyRoom } = useHasRoomStore();

  const doSignUp = async () => {
    try {
      const response = await signUp({
        nickname: signUpState.nickname,
        gender: signUpState.gender,
        birthday: signUpState.birthday,
        school: signUpState.school,
        persona: signUpState.persona,
      });

      await AsyncStorage.setItem('accessToken', response.result.tokenResponseDTO.accessToken);

      const getProfileResponse = await getMyProfile();
      setProfile(getProfileResponse.result);

      setMyRoom({ roomId: 0, hasRoom: false });
      setLoggedIn(true);
    } catch (error: any) {
      console.log(error.response.data);
    }
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
          <Pressable onPress={doSignUp}>
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
