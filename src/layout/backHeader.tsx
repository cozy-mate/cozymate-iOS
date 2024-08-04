import React from 'react';
import { Pressable, Text, View } from 'react-native';

import BackButton from '@assets/backHeader/backButton.svg';

interface BackHeaderProps {
  title: string;
  buttonString: string;
  pressFunc: () => void;
}

const BackHeader: React.FC<BackHeaderProps> = ({ title, buttonString, pressFunc }) => {
  return (
    <View className="flex flex-row items-center justify-between px-5 mt-2 mb-10">
      <Pressable className="p-2 mr-8">
        <BackButton />
      </Pressable>
      <Text className="text-base font-semibold text-basicFont">{title}</Text>
      <Pressable onPress={pressFunc}>
        <View className="px-5 py-[10px] bg-sub1 rounded-md">
          <Text className="text-xs font-semibold text-main1">{buttonString}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default BackHeader;
