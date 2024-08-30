import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

import ExampleImage from '@assets/lifeStyle/exampleImage.svg';
import { LifeStyleOnboardingScreenProps } from '@type/param/stack';
import { useRecoilValue } from 'recoil';
import { lifeStyleState, profileState } from '@recoil/recoil';

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
    <SafeAreaView className="flex flex-col flex-1 bg-white">
      <View className="px-5 mt-12">
        <View className="mb-[72px]">
          <Text className="text-xl font-semibold text-basicFont">
            <Text className="text-main1">{username}</Text>님과{'\n'}딱 맞는 라이프스타일을 가진
            {'\n'}
            <Text className="text-main1">cozymate</Text>를 찾아볼까요?
          </Text>
        </View>

        <View className="flex items-center justify-center mb-20">
          <ExampleImage />
        </View>

        <View className="flex items-center justify-center">
          <Text className="text-sm font-medium text-basicFont mb-[9px]">
            먼저, {username}님의 라이프스타일을 알려주세요!
          </Text>
          <Pressable onPress={toInput}>
            <View className="bg-sub1 px-6 py-4 rounded-[81px] text-center">
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
