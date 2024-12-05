import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  View,
  Keyboard,
  Pressable,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';

import LoadingComponent from '@components/loading/loading';
import UnivInfoSelect from '@components/onBoard/univInfoSelect';
import OneButtonModal from '@components/commonComponents/oneButtonModal';
import ButtonTextInput from '@components/schoolAuthentication/buttonTextInput';

import { useProfileStore, useIsVerifiedStore } from '@zustand/member/member';

import { useGetUniversityInfo } from '@hooks/api/university';
import { useSendMail, useVerifyMail, useCheckVerified } from '@hooks/api/mail';

import { SchoolAuthenticationScreenProps } from '@type/param/stack';

import BackButton from '@assets/backButton.svg';

const SchoolAuthenticationScreen = ({ navigation, route }: SchoolAuthenticationScreenProps) => {
  const { verified } = route.params;
  const { returnToUser, returnToRoom } = route.params ?? {};

  const { profile } = useProfileStore();
  const { isVerified, setIsVerified } = useIsVerifiedStore();

  const [majorName, setMajorName] = useState<string>('');
  const [mailAddress, setMailAddress] = useState<string>('');
  const [authenticationCode, setAuthenticationCode] = useState<string>('');

  const [isSended, setIsSended] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toReVerify = () => {
    navigation.navigate('SchoolAuthenticationScreen', { verified: false });
  };

  const toBack = () => {
    setIsModalOpen(false);
    if (returnToUser) {
      navigation.navigate('UserDetailScreen', { memberId: returnToUser });
    } else if (returnToRoom) {
      navigation.navigate('RoomDetailScreen', { roomId: returnToRoom });
    } else {
      navigation.navigate('MainScreen', { screen: 'CozyHomeScreen' });
    }
  };

  // 사용자 학교 정보 조회
  const { data: userSchoolInfo } = useGetUniversityInfo(profile.universityId);

  const { refetch: checkVerified } = useCheckVerified();

  // 인증메일 전송
  const { mutateAsync: sendAuthenticationMail, isPending: sendMailPending } = useSendMail();

  // 인증번호 확인
  const { mutateAsync: verifyAuthenticationCode, isPending: verifyMailPending } = useVerifyMail(
    checkVerified,
    setIsError,
  );

  const handleMailSend = async (): Promise<void> => {
    await sendAuthenticationMail({
      mailAddress: mailAddress,
      universityId: profile.universityId,
    });
    setIsSended(true);
  };

  const handleVerifyCode = async (): Promise<void> => {
    await verifyAuthenticationCode({
      code: authenticationCode,
      universityId: profile.universityId,
      majorName: majorName,
    });

    setIsVerified(mailAddress);
    setIsModalOpen(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex flex-1 flex-col bg-white">
        <KeyboardAwareScrollView>
          <Pressable onPress={toBack} className="px-5">
            <BackButton />
          </Pressable>
          {verified ? (
            <View className="mt-2 px-5">
              <View className="mb-4 flex flex-row items-center justify-between rounded-xl border border-sub1 bg-white px-5 py-4">
                <View className="flex flex-col items-start justify-center">
                  <Text className="text-xs font-semibold leading-[17px] tracking-tight text-colorFont">
                    학교
                  </Text>
                  <View className="mt-1.5 flex w-full flex-row items-center justify-between pb-[3px]">
                    <Text className="text-sm font-medium text-basicFont ">
                      {userSchoolInfo.result.name}
                    </Text>
                  </View>
                </View>
              </View>

              <View className="mb-4 flex flex-row items-center justify-between rounded-xl border border-sub1 bg-white px-5 py-4">
                <View className="flex flex-col items-start justify-center">
                  <Text className="text-xs font-semibold leading-[17px] tracking-tight text-colorFont">
                    학교 이메일
                  </Text>
                  <View className="mt-1.5 flex w-full flex-row items-center justify-between pb-[3px]">
                    <Text className="text-sm font-medium text-basicFont ">{isVerified}</Text>
                  </View>
                </View>
              </View>

              <Pressable className="p-2" onPress={toReVerify}>
                <Text className="text-right text-xs font-medium text-disabledFont underline">
                  학교 재인증하기
                </Text>
              </Pressable>
            </View>
          ) : (
            <View className="mt-2 px-5">
              <Text className="mb-6 px-2 font-['Pretendard'] text-xl font-semibold leading-6 text-emphasizedFont">
                룸메이트를 구하려면{'\n'}
                <Text className="text-main1">학교 인증</Text>이 필요해요!
              </Text>

              {/* 학교 (회원가입 시 지정한 학교) */}
              <View className="mb-4 flex flex-row items-center justify-between rounded-xl border border-sub1 bg-white px-5 py-4">
                <View className="flex flex-col items-start justify-center">
                  <Text className="text-xs font-semibold leading-[17px] tracking-tight text-colorFont">
                    학교
                  </Text>
                  <View className="mt-1.5 flex w-full flex-row items-center justify-between pb-[3px]">
                    <Text className="text-sm font-medium text-basicFont ">
                      {userSchoolInfo.result.name}
                    </Text>
                  </View>
                </View>
              </View>

              {/* 회원가입 시 지정한 학교의 학과 */}
              <UnivInfoSelect
                value={majorName}
                setValue={setMajorName}
                items={userSchoolInfo.result.departments}
                title="학과"
              />

              <ButtonTextInput
                title="학교 이메일"
                value={mailAddress}
                setValue={setMailAddress}
                placeholder="이메일을 입력해주세요"
                buttonString={isSended ? '인증번호 재전송' : '인증번호 전송'}
                buttonFunc={handleMailSend}
                pattern={userSchoolInfo.result.mailPattern}
              />

              {isSended && (
                <View>
                  <ButtonTextInput
                    title="인증번호 확인"
                    value={authenticationCode}
                    setValue={setAuthenticationCode}
                    placeholder="인증번호를 입력해주세요"
                    buttonString="인증번호 확인"
                    buttonFunc={handleVerifyCode}
                    isError={isError}
                  />
                  {isError && (
                    <Text className="pl-2 text-xs font-medium text-warning">
                      인증번호를 다시 확인해주세요!
                    </Text>
                  )}
                </View>
              )}

              <OneButtonModal
                isVisible={isModalOpen}
                title="학교인증이 완료됐어요"
                closeFunc={toBack}
                buttonText="확인"
                buttonFunc={toBack}
              />
            </View>
          )}
          {sendMailPending && <LoadingComponent />}
          {verifyMailPending && <LoadingComponent />}
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SchoolAuthenticationScreen;
