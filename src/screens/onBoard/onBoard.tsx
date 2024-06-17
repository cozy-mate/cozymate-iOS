import React from 'react';
import { SafeAreaView } from 'react-native';

import { OnBoardScreenProps } from '@type/param/stack';
import StepOne from '@components/onBoard/stepOne';

const OnBoardScreen = ({ navigation }: OnBoardScreenProps) => {
  return (
    <SafeAreaView className="flex-1 items-center bg-white">
      <StepOne />
    </SafeAreaView>
  );
};

export default OnBoardScreen;
