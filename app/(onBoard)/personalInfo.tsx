import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BorderDateBox from '@/components/common/borderDateBox';
import BorderRadioBox from '@/components/common/borderRadioBox';
import BottomButton from '@/components/common/bottomButton';
import NicknameInputComponent from '@/components/onBoard/nicknameInput';
import { GenderItems } from '@/constants/items/genderItem';
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
    trackInput(InputEvent.Name, EventCategory.Onboarding, {
      nickname: value,
    });
  };

  const handleGender = (value: string) => {
    setGender(value);
    trackInput(InputEvent.Gender, EventCategory.Onboarding, {
      gender: value,
    });
  };

  const handleBirthday = (value: string) => {
    setBirthday(value);
    trackInput(InputEvent.Birth, EventCategory.Onboarding, {
      birthday: value,
    });
  };

  const handleNicknameChecked = (value: boolean) => {
    setNicknameChecked(value);
    trackButton(ButtonEvent.name, EventCategory.Onboarding, {
      nickname: nickname,
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="mt-14 gap-y-[24px] px-[20px]">
          <View className="gap-y-1 mx-1">
            <Text className="text-20 text-emphasizedFont font-700">원활한 서비스 이용을 위해</Text>
            <Text className="text-20 text-emphasizedFont font-700">개인정보를 입력해주세요!</Text>
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

      <View className="absolute bottom-[42px] w-full px-[22px]">
        <BottomButton
          buttonText="다음"
          disabled={!nicknameChecked || nickname === '' || gender === '' || birthday === ''}
          onPress={() => {
            router.push('/(onBoard)/character');
            setSignUpState({
              nickname,
              gender,
              birthday,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
}
