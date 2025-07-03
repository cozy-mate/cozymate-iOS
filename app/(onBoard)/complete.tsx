import { CommonActions } from '@react-navigation/native';
import { useNavigationContainerRef } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BottomButtonComponent from '@/components/common/bottomButton';
import { getPersona } from '@/constants/items/characterItem';
import { useTracker } from '@/providers/TrackerProvider';
import { ButtonEvent, EventCategory } from '@/utils/ga/eventEnum';
import { useSignUpStore } from '@/zustand/member/member';

export default function Complete() {
  const { signUpState } = useSignUpStore();

  const navigationRef = useNavigationContainerRef();

  const { trackButton } = useTracker();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mt-[56px] gap-y-[24px] px-[20px]">
        <View className="gap-y-[2px] mx-[8px]">
          <Text className="Semibold20 text-emphasizedFont">{signUpState.nickname}님,</Text>
          <Text className="Semibold20 text-emphasizedFont">cozymate에 오신걸 환영해요!</Text>
        </View>
      </View>

      <View className="mt-[104px] mx-auto">{getPersona(signUpState.persona, 300, 300)}</View>

      <BottomButtonComponent
        buttonText="cozymate 바로가기"
        onPress={() => {
          trackButton(ButtonEvent.okay, EventCategory.onboarding5, {
            nickname: signUpState.nickname,
            gender: signUpState.gender,
            birthday: signUpState.birthday,
            persona: signUpState.persona,
          });
          navigationRef.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: '(tabs)' }],
            }),
          );
        }}
        color={'BLUE'}
        disabled={false}
      />
    </SafeAreaView>
  );
}
