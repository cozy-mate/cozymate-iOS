import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

import { OnBoardScreenProps } from '@type/param/stack';
import StepOne from '@components/onBoard/stepOne';
import StepTwo from '@components/NotUse/stepTwo';
import StepThree from '@components/NotUse/stepThree';
import StepFour from '@components/onBoard/stepFour';
import Complete from '@components/onBoard/complete';

const OnBoardScreen = ({ navigation }: OnBoardScreenProps) => {
  const [step, setStep] = useState<number>(3);

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
      {/* step === 2 && <StepTwo handleNextStep={handleNextStep} /> */}
      {/* step === 2 && <StepThree handleNextStep={handleNextStep} /> */}
      {step === 2 && <StepFour handleNextStep={handleNextStep} />}
      {step === 3 && <Complete handleNextStep={toSignIn} />}
    </SafeAreaView>
  );
};

export default OnBoardScreen;
