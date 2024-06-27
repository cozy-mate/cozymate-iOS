import React from 'react';
import { View, Text, Pressable } from 'react-native';

import CharacterImage from '@assets/onBoard/example/lulu.svg';

interface StepComponentProps {
  handleNextStep: () => void;
}

const Complete: React.FC<StepComponentProps> = ({ handleNextStep }) => {
  return (
    <View className="flex-1 px-5">
      <View className="mt-[56px] mb-[156px]">
        <View className="mb-[108px] leading-loose">
          <Text className="text-lg font-semibold tracking-tight text-basicFont">델로님,</Text>
          <Text className="text-lg font-semibold tracking-tight text-basicFont">
            cozymate에 오신걸 환영해요!
          </Text>
        </View>

        <View className="flex items-center">
          <CharacterImage />
        </View>
      </View>

      <View className="flex">
        <Pressable onPress={handleNextStep}>
          <View className="p-4 text-base font-semibold rounded-xl bg-main">
            <Text className="text-center text-white">cozymate 바로가기</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default Complete;
