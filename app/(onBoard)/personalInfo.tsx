import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BorderDateBox from '@/components/common/borderDateBox';
import BorderRadioBox from '@/components/common/borderRadioBox';
import NicknameInputComponent from '@/components/onBoard/nicknameInput';
import { GenderItems } from '@/constants/items/genderItem';
import BottomButtonComponent from '@/newComponents/common/bottomButton';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory, InputEvent } from '@/utils/ga/eventEnum';
import { useSignUpStore } from '@/zustand/member/member';

export default function PersonalInfo() {
  const router = useRouter();

  const { setSignUpState } = useSignUpStore();

  const [nickname, setNickname] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');

  const [nicknameChecked, setNicknameChecked] = useState<boolean>(false);

  const { trackInput, trackButton } = useTracker();

  const handleNickname = (value: string) => {
    setNickname(value);
    trackInput(InputEvent.name, EventCategory.onboarding2, {
      nickname: value,
    });
  };

  const handleGender = (value: string) => {
    setGender(value);
    trackInput(InputEvent.gender, EventCategory.onboarding2, {
      gender: value,
    });
  };

  const handleBirthday = (value: string) => {
    setBirthday(value);
    trackInput(InputEvent.birth, EventCategory.onboarding2, {
      birthday: value,
    });
  };

  const handleNicknameChecked = (value: boolean) => {
    setNicknameChecked(value);
    trackButton(ButtonEvent.name, EventCategory.onboarding2, {
      nickname: nickname,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="mt-[56px] gap-y-[24px] px-[20px]">
          <View className="gap-y-[4px] mx-[4px]">
            <Text className="text-20 text-emphasizedFont font-600">원활한 서비스 이용을 위해</Text>
            <Text className="text-20 text-emphasizedFont font-600">개인정보를 입력해주세요!</Text>
          </View>

          <View className="gap-y-[16px]">
            {/* 닉네임 입력 */}
            <NicknameInputComponent
              title="닉네임"
              value={nickname}
              handleValue={handleNickname}
              placeholder="닉네임을 입력해주세요"
              handleNicknameChecked={handleNicknameChecked}
            />

            {/* 성별 입력 */}
            <BorderRadioBox
              title="성별"
              items={GenderItems}
              value={gender}
              handleValue={handleGender}
            />

            {/* 생년월일 입력 */}
            <BorderDateBox title="생년월일" value={birthday} handleValue={handleBirthday} />
          </View>
        </View>
      </TouchableWithoutFeedback>

      <BottomButtonComponent
        buttonText="다음"
        onPress={() => {
          router.push('/(onBoard)/character');
          setSignUpState({
            nickname,
            gender,
            birthday,
          });
        }}
        color={
          !nicknameChecked || nickname === '' || gender === '' || birthday === '' ? 'GRAY' : 'BLUE'
        }
        disabled={!nicknameChecked || nickname === '' || gender === '' || birthday === ''}
      />
    </SafeAreaView>
  );
}
