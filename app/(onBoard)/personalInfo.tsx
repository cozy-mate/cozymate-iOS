import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BorderDateBox from '@/components/common/borderDateBox';
import BorderRadioBox from '@/components/common/borderRadioBox';
import BottomButton from '@/components/common/bottomButton';
import NicknameInputComponent from '@/components/onBoard/nicknameInput';
import { GenderItems } from '@/constants/items/genderItem';
import { useSignUpStore } from '@/zustand/member/member';

export default function PersonalInfo() {
  const router = useRouter();

  const { setSignUpState } = useSignUpStore();

  const [nickname, setNickname] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');

  const [nicknameChecked, setNicknameChecked] = useState<boolean>(false);

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
              handleValue={(e: string) => setNickname(e)}
              placeholder="닉네임을 입력해주세요"
              handleNicknameChecked={(e: boolean) => setNicknameChecked(e)}
            />

            {/* 성별 입력 */}
            <BorderRadioBox
              title="성별"
              items={GenderItems}
              value={gender}
              handleValue={(e: string) => setGender(e)}
            />

            {/* 생년월일 입력 */}
            <BorderDateBox
              title="생년월일"
              value={birthday}
              handleValue={(e: string) => setBirthday(e)}
            />
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
