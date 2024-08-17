import React from 'react';
import { Pressable, Text, View } from 'react-native';

import BackButton from '@assets/backHeader/backButton.svg';

interface BackNavProps {
  leftPressFunc: () => void;
}

const BackNav: React.FC<BackNavProps> = ({ leftPressFunc }) => {
  return (
    <View className="mb-2">
      <View className="flex flex-row items-center justify-between px-5 mt-2 mb-4">
        <Pressable onPress={leftPressFunc} className="p-2 mr-8">
          <BackButton />
        </Pressable>
      </View>
    </View>
  );
};

export default BackNav;
