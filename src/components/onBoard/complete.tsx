import React from 'react';
import { View, Text, Pressable } from 'react-native';

import CharacterImage from '@assets/onBoard/lulu.svg';

interface StepComponentProps {
  handleNextStep: () => void;
}

const Complete: React.FC<StepComponentProps> = ({ handleNextStep }) => {
  return (
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
          <CharacterImage />
        </View>
      </View>

      {/* 하단 View */}
      <View className="flex">
        <Pressable onPress={handleNextStep}>
          <View className="p-4 rounded-xl bg-main1">
            <Text className="text-base font-semibold text-center text-white">
              cozymate 바로가기
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Complete;
