import { useEffect, useState } from 'react';
import { Alert, Modal, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

import BorderButtonBox from '@/components/common/borderComponent/borderButtonBox';
import BorderPressBox from '@/components/common/borderComponent/borderPressBox';
import LoadingComponent from '@/components/common/loading';
import MajorSelectModalComponent from '@/components/onBoard/schoolAuthentication/majorSelectModal';
import SchoolSelectModalComponent from '@/components/onBoard/schoolAuthentication/schoolSelectModal';
import TermsAgreeComponent from '@/components/onBoard/schoolAuthentication/termModal';
import { useSendMail, useVerifyMail } from '@/hooks/mail/mail';
import { useGetUniversityInfo } from '@/hooks/university/university';
import { useTracker } from '@/providers/TrackerProvider';
import { UniversityItem } from '@/type/university';
import { ButtonEvent, EventCategory, InputEvent } from '@/utils/ga/eventEnum';
import { useMailAuthenticationStore } from '@/zustand/mail/mail';

export default function SchoolAuthentication() {
  const { trackInput, trackButton } = useTracker();

  const { mailState, setMailState } = useMailAuthenticationStore();

  const [isSchoolSelectModalOpen, setIsSchoolSelectModalOpen] = useState<boolean>(false);
  const [isMajorSelectModalOpen, setIsMajorSelectModalOpen] = useState<boolean>(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState<boolean>(false);

  const [isAgreed, setIsAgreed] = useState<boolean>(false);

  const [isSended, setIsSended] = useState<boolean>(false);

  const { data } = useGetUniversityInfo(mailState.universityId);

  const getDomain = (value: string) => {
    const atIndex = value.indexOf('@');
    return atIndex !== -1 ? value.slice(atIndex + 1) : '';
  };

  const [isSendMailError, setSendMaillError] = useState<boolean>(false);
  const [sendMailErrorText, setSendMailErrorText] = useState<string>('');
  const { mutateAsync: sendMail, isPending: sendMailPending } = useSendMail(
    setSendMaillError,
    setSendMailErrorText,
  );

  const [isVerifyMailError, setIsVerifyMailError] = useState<boolean>(false);
  const [verifyMailErrorText, setVerifyMailErrorText] = useState<string>('');
  const { mutateAsync: verifyMail, isPending: verifyMailPending } = useVerifyMail(
    setIsVerifyMailError,
    setVerifyMailErrorText,
  );

  // 이메일이 변경되었을 때 이메일 에러 해제
  useEffect(() => {
    if (isSendMailError) {
      setSendMaillError(false);
      setSendMailErrorText('');
    }
  }, [mailState.mailAddress]);

  // 인증 코드가 변경되었을 때 인증 에러 해제
  useEffect(() => {
    if (isVerifyMailError) {
      setIsVerifyMailError(false);
      setVerifyMailErrorText('');
    }
  }, [mailState.code]);

  const handleConfirm = async () => {
    try {
      setIsAgreed(true);
      setIsTermsModalOpen(false);

      await sendMail({
        mailAddress: mailState.mailAddress,
        universityId: mailState.universityId,
      });

      setIsSended(true);

      trackButton(ButtonEvent.okay, EventCategory.onboarding5);
    } catch (error: any) {
      console.log(error.config);
    }
  };

  const handleSendMail = async () => {
    if (isAgreed) {
      await sendMail({
        mailAddress: mailState.mailAddress,
        universityId: mailState.universityId,
      });
    } else {
      setIsTermsModalOpen(true);
    }

    trackButton(ButtonEvent.email, EventCategory.onboarding1, {
      email: mailState.mailAddress,
    });
  };

  const handleVerifyMail = async () => {
    try {
      await verifyMail({
        code: mailState.code,
        universityId: mailState.universityId,
        majorName: mailState.majorName,
      });

      trackButton(ButtonEvent.email_code, EventCategory.onboarding1, {
        code: mailState.code,
      });
    } catch (error: any) {
      console.log(error);
      // setIsError(true);
    }
  };

  const handleUniversity = (item: UniversityItem) => {
    setMailState({ universityId: item.id, universityName: item.name, majorName: '' });

    setIsSchoolSelectModalOpen(false);

    trackInput(InputEvent.univ, EventCategory.onboarding1, {
      universityName: item.name,
    });
  };

  const handleMajor = (majorName: string) => {
    setMailState({ majorName: majorName });

    setIsMajorSelectModalOpen(false);

    trackInput(InputEvent.major, EventCategory.onboarding1, {
      majorName: majorName,
    });
  };

  const handleMail = (value: string) => {
    setMailState({ mailAddress: value });
    trackInput(InputEvent.email, EventCategory.onboarding1, {
      email: value,
    });
  };

  const handleCode = (value: string) => {
    setMailState({ code: value });
    trackInput(InputEvent.email_code, EventCategory.onboarding1, {
      code: mailState.code,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Modal visible={sendMailPending || verifyMailPending} transparent={true}>
        <LoadingComponent />
      </Modal>

      <KeyboardAwareScrollView
        contentContainerStyle={{ rowGap: 24, paddingHorizontal: 20, paddingTop: 56 }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <View className="gap-y-[4px] mx-[8px]">
          <Text className="Semibold20 text-emphasizedFont">룸메이트를 구하려면,</Text>
          <Text className="Semibold20 text-emphasizedFont">
            <Text className="text-mainColor">학교 인증</Text>이 필요해요!
          </Text>
        </View>

        <View className="gap-y-[16px]">
          {/* 학교 입력 */}
          <BorderPressBox
            title="학교"
            value={mailState.universityName}
            placeholder="학교를 선택해주세요"
            onPress={() => setIsSchoolSelectModalOpen(true)}
          />

          {/* 학과 입력 */}
          <BorderPressBox
            title="학과"
            value={mailState.majorName}
            placeholder="학과를 선택해주세요"
            onPress={() => {
              if (mailState.universityId === 0) {
                Alert.alert('학교를 먼저 선택해주세요!');
              } else {
                setIsMajorSelectModalOpen(true);
              }
            }}
          />

          {/* 학교 이메일 입력 */}
          <BorderButtonBox
            title="학교 이메일"
            value={mailState.mailAddress}
            onChangeText={handleMail}
            placeholder="학교 이메일을 입력해주세요"
            buttonText={`${isSended ? '인증번호 재전송' : '인증번호 전송'}`}
            buttonDisabled={!data?.result.mailPatterns.includes(getDomain(mailState.mailAddress))}
            onButtonPress={handleSendMail}
            isError={isSendMailError}
            errorText={sendMailErrorText}
          />

          {/* 인증번호 입력 */}
          <BorderButtonBox
            title="인증번호 확인"
            value={mailState.code}
            onChangeText={handleCode}
            placeholder="인증 번호를 입력해주세요"
            buttonText="인증번호 확인"
            buttonDisabled={mailState.code === ''}
            onButtonPress={handleVerifyMail}
            isError={isVerifyMailError}
            errorText={verifyMailErrorText}
          />
        </View>
      </KeyboardAwareScrollView>

      <SchoolSelectModalComponent
        isVisible={isSchoolSelectModalOpen}
        handleValue={handleUniversity}
        closeModal={() => setIsSchoolSelectModalOpen(false)}
      />

      <MajorSelectModalComponent
        isVisible={isMajorSelectModalOpen}
        universityId={mailState.universityId}
        handleValue={handleMajor}
        closeModal={() => setIsMajorSelectModalOpen(false)}
      />

      <TermsAgreeComponent
        isVisible={isTermsModalOpen}
        closeModal={() => setIsTermsModalOpen(false)}
        confirmFunc={handleConfirm}
      />
    </SafeAreaView>
  );
}
