import React from 'react';
import { Text, View, Pressable } from 'react-native';

import BackButton from '@assets/backHeader/backButton.svg';

interface BackNavProps {
  leftPressFunc: () => void;
}

const BackNav: React.FC<BackNavProps> = ({ leftPressFunc }) => {
  return (
    <View className="mb-2">
      <View className="mb-4 mt-2 flex flex-row items-center justify-between px-5">
        <Pressable onPress={leftPressFunc} className="mr-8 p-2">
          <BackButton />
        </Pressable>
      </View>
    </View>
  );
};

export default BackNav;
