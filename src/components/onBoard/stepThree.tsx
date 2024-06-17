import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import InputBoxComponent from '@components/inputBox';
import PinkCharacter from '@assets/onBoard/pinkCharacter.svg';

interface StepComponentProps {
  handleNextStep: () => void;
}

const StepThree: React.FC<StepComponentProps> = ({ handleNextStep }) => {
  const [isSended, setIsSended] = useState<boolean>(true);

  const [school, setSchool] = useState<string>('');
  const [schoolEmail, setSchoolEmail] = useState<string>('');
  const [certNumber, setCertNumber] = useState<string>('');

  return (
    <View className="flex-1">
      <View className={isSended ? 'mt-[67px] mb-[100px]' : 'mt-[67px] mb-[196px]'}>
        <View className="mb-6 leading-loose">
          <Text className="text-lg font-semibold text-[#46464B] tracking-tight">학교 이메일을</Text>
          <Text className="text-lg font-semibold text-[#46464B] tracking-tight">인증해주세요!</Text>
        </View>

        <View>
          <InputBoxComponent
            title="학교"
            value={school}
            setValue={setSchool}
            placeholder="학교를 선택해주세요"
          />
        </View>

        <View>
          <InputBoxComponent
            title="학교 이메일"
            value={schoolEmail}
            setValue={setSchoolEmail}
            placeholder="학교 이메일을 입력해주세요"
          />
        </View>

        {isSended && (
          <View>
            <InputBoxComponent
              title="인증번호 입력"
              value={certNumber}
              setValue={setCertNumber}
              placeholder="인증번호를 입력해주세요"
            />
          </View>
        )}
      </View>

      <Pressable onPress={handleNextStep}>
        <Text>클릭</Text>
      </Pressable>
      <PinkCharacter />
    </View>
  );
};

export default StepThree;
