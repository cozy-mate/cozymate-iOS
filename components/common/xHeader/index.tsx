import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, View } from 'react-native';

import XButton from '@/assets/images/common/xButton.svg';

const XHeaderComponent: React.FC = () => {
  const router = useRouter();

  return (
    <View className="mt-[8px] flex flex-row justify-end items-center">
      <Pressable
        onPress={() => router.back()}
        className="w-10 h-10 flex items-center justify-center"
      >
        <XButton />
      </Pressable>
    </View>
  );
};

export default XHeaderComponent;
