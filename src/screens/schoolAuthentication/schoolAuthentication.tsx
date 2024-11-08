import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Keyboard,
  Pressable,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

import ButtonModal from '@components/common/buttonModal';
import UnivInfoSelect from '@components/onBoard/univInfoSelect';
import ButtonTextInput from '@components/schoolAuthentication/buttonTextInput';

import { sendMail, verifyMail } from '@server/api/mail';
import { getUserUniversity } from '@server/api/university';

import { SchoolAuthenticationScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';

const SchoolAuthenticationScreen = ({ navigation }: SchoolAuthenticationScreenProps) => {
  const [school, setSchool] = useState<number>(0);
  const [displaySchool, setDisplaySchool] = useState<string>('');
  const [major, setMajor] = useState<string>('');

  const [mailAddress, setMailAddress] = useState<string>('');
  const [authenticationCode, setAuthenticationCode] = useState<string>('');

  const [isSended, setIsSended] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSend = async (): Promise<void> => {
    setIsSended(true);
    console.log(mailAddress, school);
    try {
      await sendMail({ mailAddress: mailAddress, universityId: school });
    } catch (error: any) {
      console.log(error.response?.data?.code);
    }
  };

  const verify = async (): Promise<void> => {
    try {
      await verifyMail({ majorName: major, code: authenticationCode, universityId: school });

      setIsModalOpen(true);
    } catch (error: any) {
      console.log(error.response?.data?.code);
    }
  };

  const toBack = () => {
    navigation.navigate('MainScreen', { screen: 'CozyHomeScreen' });
  };

  const [departments, setDepartments] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserUniversity();
      setSchool(response.result.id);
      setDisplaySchool(response.result.name);
      setDepartments(response.result.departments);
    };

    fetchData();
  }, []);

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

          {/* 학교 (회원가입 시 지정한 학교) */}
          <View className="mb-4 flex flex-row items-center justify-between rounded-xl border border-main1 bg-white px-5 py-4">
            <View className="flex flex-col items-start justify-center">
              <Text className="text-xs font-semibold leading-[17px] tracking-tight text-main1">
                학교
              </Text>
              <View className="mt-1.5 flex w-full flex-row items-center justify-between pb-[3px]">
                <Text className="text-sm font-medium text-basicFont ">{displaySchool}</Text>
              </View>
            </View>
          </View>

          {/* 회원가입 시 지정한 학교의 학과 */}
          <UnivInfoSelect value={major} setValue={setMajor} items={departments} title="학과" />

          <ButtonTextInput
            title="학교 이메일"
            value={mailAddress}
            setValue={setMailAddress}
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
              buttonFunc={verify}
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
