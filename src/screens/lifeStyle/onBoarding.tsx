import React from 'react';
import { Text, View, Pressable, SafeAreaView } from 'react-native';

import { useProfileStore } from '@zustand/member/member';

import { LifeStyleOnboardingScreenProps } from '@type/param/stack';

import XButton from '@assets/xButton.svg';
import ExampleImage from '@assets/lifeStyle/exampleImage.svg';

const LifeStyleOnboardingScreen = ({ navigation }: LifeStyleOnboardingScreenProps) => {
  const { profile } = useProfileStore();

  const toInput = () => {
    navigation.navigate('BasicLifeStyleScreen');
  };

  const toBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-1 flex-col justify-between">
        <View className="flex flex-col">
          <View className="px-5">
            <Pressable onPress={toBack} className="mb-10 flex flex-row justify-end">
              <XButton />
            </Pressable>

            <Text className="mb-[70px] text-xl font-semibold text-basicFont">
              <Text className="text-main1">{profile.nickname}</Text>님과{'\n'}딱 맞는 라이프스타일을
              가진
              {'\n'}
              <Text className="text-main1">cozymate</Text>를 찾아볼까요?
            </Text>

            <View className="flex items-center justify-center">
              <ExampleImage />
            </View>
          </View>
        </View>

        <Pressable onPress={toInput} className="mb-2 px-[30px] drop-shadow-buttonBack">
          <View className="rounded-xl bg-main1 p-4">
            <Text className="text-center text-base font-semibold text-white">
              내 라이프 스타일 입력하러 가기
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LifeStyleOnboardingScreen;
