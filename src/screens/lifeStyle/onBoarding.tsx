import { useRecoilValue } from 'recoil';
import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, SafeAreaView } from 'react-native';

import { profileState, lifeStyleState } from '@recoil/recoil';

import { LifeStyleOnboardingScreenProps } from '@type/param/stack';

import ExampleImage from '@assets/lifeStyle/exampleImage.svg';

const LifeStyleOnboardingScreen = ({ navigation }: LifeStyleOnboardingScreenProps) => {
  const lifeStyle = useRecoilValue(lifeStyleState);
  const memberInfo = useRecoilValue(profileState);

  const [username, setUsername] = useState<string>(memberInfo.nickname);

  useEffect(() => {
    console.log(lifeStyle);
  }, [lifeStyle]);

  const toInput = () => {
    navigation.navigate('BasicLifeStyleScreen');
  };

  return (
    <SafeAreaView className="flex flex-1 flex-col bg-white">
      <View className="mt-12 px-5">
        <View className="mb-[72px]">
          <Text className="text-xl font-semibold text-basicFont">
            <Text className="text-main1">{username}</Text>님과{'\n'}딱 맞는 라이프스타일을 가진
            {'\n'}
            <Text className="text-main1">cozymate</Text>를 찾아볼까요?
          </Text>
        </View>

        <View className="mb-20 flex items-center justify-center">
          <ExampleImage />
        </View>

        <View className="flex items-center justify-center">
          <Text className="mb-[9px] text-sm font-medium text-basicFont">
            먼저, {username}님의 라이프스타일을 알려주세요!
          </Text>
          <Pressable onPress={toInput}>
            <View className="rounded-[81px] bg-sub1 px-6 py-4 text-center">
              <Text className="text-sm font-semibold text-main1">
                내 라이프 스타일 입력하러 가기
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LifeStyleOnboardingScreen;
