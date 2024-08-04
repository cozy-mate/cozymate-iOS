import React from 'react';
import { Pressable, SafeAreaView, Text, View } from 'react-native';

import { useRecoilValue } from 'recoil';
import { signUpState } from '@recoil/recoil';

import { CompleteScreenProps } from '@type/param/stack';

const CompleteScreen = ({ navigation }: CompleteScreenProps) => {
  const signUp = useRecoilValue(signUpState);

  const toNext = async (): Promise<void> => {
    navigation.navigate('CozyHomeScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex flex-col justify-between flex-1 px-5">
        {/* 상단 View */}
        <View className="flex mt-[56px]">
          {/* 설명 Text */}
          <View className="mb-[108px] leading-loose">
            <Text className="text-lg font-semibold tracking-tight text-emphasizedFont">
              델로님,{'\n'}cozymate에 오신걸 환영해요!
            </Text>
          </View>

          {/* 선택된 캐릭터 이미지 */}
          <View className="flex items-center">
            <View>
              <Text>{signUp.character}</Text>
            </View>
          </View>
        </View>

        {/* 하단 View */}
        <View className="flex">
          <Pressable onPress={toNext}>
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
