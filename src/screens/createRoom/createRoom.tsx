import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

import { CreateRommScreenProps } from '@type/param/stack';
import BasicInformation from '@components/createRoom/basicInformation';
import EssentialInformation from '@components/createRoom/essentialInfomation';
import AdditionalInformation from '@components/createRoom/additionalInfomation';

const CreateRoomScreen = ({ navigation }: CreateRommScreenProps) => {
  const [step, setStep] = useState<number>(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const toSignIn = () => {
    navigation.navigate('SignInScreen');
    setStep(1);
  };

  return (
    <SafeAreaView className="flex-1 bg-white ">
      {step === 1 && <BasicInformation handleNextStep={handleNextStep} />}
      {step === 2 && <EssentialInformation handleNextStep={handleNextStep} />}
      {step === 3 && <AdditionalInformation handleNextStep={toSignIn} />}
    </SafeAreaView>
  );
};

export default CreateRoomScreen;
