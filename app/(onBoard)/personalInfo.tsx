import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

import BorderButtonBox from '@/components/common/borderComponent/borderButtonBox';
import BorderPressBox from '@/components/common/borderComponent/borderPressBox';
import BorderSelectBox from '@/components/common/borderComponent/borderSelectBox';
import BottomButtonComponent from '@/components/common/bottomButton';
import { GenderItems } from '@/constants/items/genderItem';
import { useTracker } from '@/providers/TrackerProvider';
import { checkNickname } from '@/server/member/member';
import { ButtonEvent, EventCategory, InputEvent } from '@/utils/ga/eventEnum';
import { useSignUpStore } from '@/zustand/member/member';

export default function PersonalInfo() {
  const router = useRouter();

  const { signUpState, setSignUpState } = useSignUpStore();

  const [isNicknameError, setIsNicknameError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [successText, setSuccessText] = useState<string>('');

  const [isDateModalOpen, setIsDateModalOpen] = useState<boolean>(false);

  const handleError = async () => {
    const response = await checkNickname(signUpState.nickname);

    if (response.result) {
      setIsNicknameError(false);
      setErrorText('');
      setSuccessText('사용가능한 닉네임이에요!');
      handleNicknameChecked(true);
    } else {
      setIsNicknameError(true);
      setErrorText('이미 사용중인 닉네임이에요!');
      handleNicknameChecked(false);
    }
  };

  const [nicknameChecked, setNicknameChecked] = useState<boolean>(false);

  const { trackInput, trackButton } = useTracker();

  const handleNickname = (value: string) => {
    setSignUpState({ nickname: value });
    trackInput(InputEvent.name, EventCategory.onboarding2, {
      nickname: value,
    });
  };

  const handleGender = (value: string) => {
    setSignUpState({ gender: value });
    trackInput(InputEvent.gender, EventCategory.onboarding2, {
      gender: value,
    });
  };

  const handleNicknameChecked = (value: boolean) => {
    setNicknameChecked(value);
    trackButton(ButtonEvent.name, EventCategory.onboarding2, {
      nickname: signUpState.nickname,
    });
  };

  const handleBirthday = (date: Date) => {
    const formattedDateForStorage = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    setIsDateModalOpen(false);
    setSignUpState({ birthday: formattedDateForStorage });
    trackInput(InputEvent.birth, EventCategory.onboarding2, {
      birthday: formattedDateForStorage,
    });
  };

  const formatDate = (dateString: string): string => {
    if (dateString === '') {
      return '';
    }
    const [year, month, day] = dateString.split('-');
    return `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`;
  };

  useEffect(() => {
    const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;

    if (signUpState.nickname.trim().length !== 0) {
      if (signUpState.nickname.trim().length < 2 || signUpState.nickname.trim().length > 8) {
        setIsNicknameError(true);
        setErrorText('닉네임은 2 ~ 8글자만 가능해요!');
        handleNicknameChecked(false);
      } else if (!nicknameRegex.test(signUpState.nickname)) {
        setIsNicknameError(true);
        setErrorText('닉네임은 한글, 영어, 숫자만 사용할 수 있어요!');
        handleNicknameChecked(false);
      } else {
        setIsNicknameError(false);
        setErrorText('');
        handleNicknameChecked(false);
        setSuccessText('');
      }
    } else {
      setIsNicknameError(false);
      setErrorText('');
      handleNicknameChecked(false);
    }
  }, [signUpState.nickname]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        contentContainerStyle={{ rowGap: 24, paddingHorizontal: 20, paddingTop: 56 }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={20}
      >
        <View className="gap-y-[24px]">
          <View className="gap-y-[4px] mx-[4px]">
            <Text className="Semibold20 text-emphasizedFont">원활한 서비스 이용을 위해</Text>
            <Text className="Semibold20 text-emphasizedFont">개인정보를 입력해주세요!</Text>
          </View>

          <View className="gap-y-[16px]">
            {/* 닉네임 입력 */}
            <BorderButtonBox
              title="닉네임"
              value={signUpState.nickname}
              placeholder="닉네임을 입력해주세요"
              onChangeText={handleNickname}
              buttonText="중복 확인"
              onButtonPress={handleError}
              buttonDisabled={isNicknameError || signUpState.nickname.trim().length === 0}
              isError={isNicknameError}
              errorText={errorText}
              successText={successText}
            />

            {/* 성별 입력 */}
            <BorderSelectBox
              title="성별"
              value={signUpState.gender}
              items={GenderItems}
              onPress={handleGender}
            />

            {/* 생년월일 입력 */}
            <BorderPressBox
              title="생년월일"
              value={formatDate(signUpState.birthday)}
              placeholder="생일을 선택해주세요"
              onPress={() => setIsDateModalOpen(true)}
              hasArrow={true}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <DateTimePickerModal
        isVisible={isDateModalOpen}
        mode="date"
        onConfirm={handleBirthday}
        onCancel={() => setIsDateModalOpen(false)}
        locale="ko-KR"
      />

      <BottomButtonComponent
        buttonText="다음"
        onPress={() => router.push('/(onBoard)/character')}
        color={
          !nicknameChecked ||
          signUpState.nickname === '' ||
          signUpState.gender === '' ||
          signUpState.birthday === ''
            ? 'GRAY'
            : 'BLUE'
        }
        disabled={
          !nicknameChecked ||
          signUpState.nickname === '' ||
          signUpState.gender === '' ||
          signUpState.birthday === ''
        }
      />
    </SafeAreaView>
  );
}
