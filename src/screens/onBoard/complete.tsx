import React, { useEffect } from 'react';
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native';
import Config from 'react-native-config';

import { useRecoilState, useRecoilValue } from 'recoil';
import { loggedInState, signUpState } from '@recoil/recoil';

import { CompleteScreenProps } from '@type/param/rootStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { signUp } from '@server/api/member';

const CompleteScreen = ({ navigation }: CompleteScreenProps) => {
  const signupstate = useRecoilValue(signUpState);

  useEffect(() => {
    console.log(signupstate);
  }, [signupstate]);

  const [, setLoggedIn] = useRecoilState(loggedInState);

  const doSignUp = async () => {
    try {
      const response = await signUp(
        {
          name: signupstate.name,
          nickName: signupstate.nickName,
          gender: signupstate.gender,
          birthday: signupstate.birthday,
          persona: signupstate.persona,
        },
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNjYxOTkzODU0OktBS0FPIiwidG9rZW5UeXBlIjoiVEVNUE9SQVJZIiwiaWF0IjoxNzIzNTYxNjM2LCJleHAiOjE3MjM1NjE5OTZ9.FY9VJOmnfSs9KXG-QETH6JdUsvNM6cDZgm8ok-LAb20',
      );

      AsyncStorage.setItem('accessToken', response.result.accessToken);
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-col justify-between flex-1 px-5">
        {/* 상단 View */}
        <View className="flex mt-[56px]">
          {/* 설명 Text */}
          <View className="mb-[108px] leading-loose">
            <Text className="text-lg font-semibold tracking-tight text-emphasizedFont">
              {signupstate.nickName}님,{'\n'}cozymate에 오신걸 환영해요!
            </Text>
          </View>

          {/* 선택된 캐릭터 이미지 */}
          <View className="flex items-center">
            <View>
              <Image
                source={{
                  uri: `${Config.S3_IMAGE_URL}/persona/png/${signupstate.persona}.png`,
                }}
                style={{ width: 300, height: 300 }}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        {/* 하단 View */}
        <View className="flex">
          <Pressable onPress={doSignUp}>
            <View className="p-4 rounded-xl bg-main1">
              <Text className="text-base font-semibold text-center text-white">
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
