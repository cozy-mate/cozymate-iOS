import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import BackButton from '@assets/backHeader/backButton.svg';

interface BackHeaderProps {
  onPressBack: () => void;
}

const BackCleanHeader: React.FC<BackHeaderProps> = (props) => {
  const { onPressBack } = props;

  return (
    <View className="mb-5">
      <View className={`flex flex-row items-center justify-start px-5`}>
        <TouchableOpacity onPress={onPressBack} className="">
          <BackButton />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BackCleanHeader;
