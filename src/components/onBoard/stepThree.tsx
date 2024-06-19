import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import TextInputBoxComponent from '@components/textInputBox';
import PinkCharacter from '@assets/onBoard/pinkCharacter.svg';

import AbleNextButtonIcon from '@assets/onBoard/ableNextButton.svg';
import DisableNextButtonIcon from '@assets/onBoard/disableNextButton.svg';

interface StepComponentProps {
  handleNextStep: () => void;
}

const StepThree: React.FC<StepComponentProps> = ({ handleNextStep }) => {
  const [isSended, setIsSended] = useState<boolean>(false);

  const handleSended = () => {
    setIsSended(true);
  };

  const [school, setSchool] = useState<string>('');
  const [schoolEmail, setSchoolEmail] = useState<string>('');
  const [certNumber, setCertNumber] = useState<string>('');

  const isComplete = school !== '' && schoolEmail !== '' && certNumber !== '';

  return (
    <View className="flex-1 px-5">
      <View className={isSended ? 'mt-[67px] mb-[64px]' : 'mt-[67px] mb-[156px]'}>
        <View className="mb-6 leading-loose">
          <Text className="text-lg font-semibold text-[#46464B] tracking-tight">학교 이메일을</Text>
          <Text className="text-lg font-semibold text-[#46464B] tracking-tight">인증해주세요!</Text>
        </View>

        <View>
          <TextInputBoxComponent
            title="학교"
            value={school}
            setValue={setSchool}
            placeholder="학교를 선택해주세요"
            hasButton={false}
          />
        </View>

        <View>
          <TextInputBoxComponent
            title="학교 이메일"
            value={schoolEmail}
            setValue={setSchoolEmail}
            placeholder="학교 이메일을 입력해주세요"
            hasButton={true}
            buttonString={isSended ? '인증번호 재전송' : '인증번호 전송'}
            pressFunc={handleSended}
          />
        </View>

        {isSended && (
          <View>
            <TextInputBoxComponent
              title="인증번호 입력"
              value={certNumber}
              setValue={setCertNumber}
              placeholder="인증번호를 입력해주세요"
              hasButton={true}
              buttonString={'인증번호 확인'}
            />
          </View>
        )}
      </View>

      <View className="flex items-end">
        <Pressable onPress={handleNextStep} disabled={!isComplete}>
          {isComplete ? <AbleNextButtonIcon /> : <DisableNextButtonIcon />}
        </Pressable>
      </View>

      <View className="mt-[-19px]">
        <PinkCharacter />
      </View>
    </View>
  );
};

export default StepThree;
