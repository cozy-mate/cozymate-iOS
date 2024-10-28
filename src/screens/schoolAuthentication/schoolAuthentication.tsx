import React, { useState } from 'react';
import {
  Text,
  View,
  Keyboard,
  Pressable,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

import ButtonModal from '@components/common/buttonModal';
import SchoolSelect from '@components/onBoard/schoolSelect';
import ButtonTextInput from '@components/schoolAuthentication/buttonTextInput';

import { SchoolAuthenticationScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';

const SchoolAuthenticationScreen = ({ navigation }: SchoolAuthenticationScreenProps) => {
  const [school, setSchool] = useState<number>(0);
  const [major, setMajor] = useState<number>(0);
  const [schoolEmail, setSchoolEmail] = useState<string>('');
  const [authenticationCode, setAuthenticationCode] = useState<string>('');

  const [isSended, setIsSended] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSend = () => {
    setIsSended(true);
  };

  const toBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex flex-1 flex-col bg-white">
        <Pressable onPress={toBack} className="pl-3">
          <BackButton />
        </Pressable>
        <View className="mt-2 px-5">
          <Text className="mb-6 px-2 font-['Pretendard'] text-xl font-semibold leading-6 text-emphasizedFont">
            룸메이트를 구하려면{'\n'}
            <Text className="text-main1">학교 인증</Text>이 필요해요!
          </Text>

          <SchoolSelect school={school} setSchool={setSchool} title="학교" />

          <SchoolSelect school={major} setSchool={setMajor} title="학과" />

          <ButtonTextInput
            title="학교 이메일"
            value={schoolEmail}
            setValue={setSchoolEmail}
            placeholder="이메일을 입력해주세요"
            buttonString={isSended ? '인증번호 재전송' : '인증번호 전송'}
            buttonFunc={handleSend}
          />

          {isSended && (
            <ButtonTextInput
              title="인증번호 확인"
              value={authenticationCode}
              setValue={setAuthenticationCode}
              placeholder="인증번호를 입력해주세요"
              buttonString="인증번호 확인"
              buttonFunc={() => setIsModalOpen(true)}
            />
          )}

          <ButtonModal
            title="학교인증이 완료됐어요"
            submitText="확인"
            isVisible={isModalOpen}
            buttonCount={1}
            closeModal={() => setIsModalOpen(false)}
            onSubmit={toBack}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SchoolAuthenticationScreen;
