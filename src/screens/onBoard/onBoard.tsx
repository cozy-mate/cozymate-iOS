import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

import { OnBoardScreenProps } from '@type/param/stack';
import StepOne from '@components/onBoard/stepOne';
import StepTwo from '@components/onBoard/stepTwo';
import StepThree from '@components/onBoard/stepThree';

const OnBoardScreen = ({ navigation }: OnBoardScreenProps) => {
  const [step, setStep] = useState<number>(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const toSignIn = () => {
    navigation.navigate('SignInScreen');
    setStep(1);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {step === 1 && <StepOne handleNextStep={handleNextStep} />}
      {step === 2 && <StepTwo handleNextStep={handleNextStep} />}
      {step === 3 && <StepThree handleNextStep={toSignIn} />}
    </SafeAreaView>
  );
};

export default OnBoardScreen;
