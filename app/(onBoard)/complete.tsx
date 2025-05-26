import { CommonActions } from '@react-navigation/native';
import { useNavigationContainerRef, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BottomButton from '@/components/common/bottomButton';
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
      <View className="mt-14 gap-y-[24px] px-[20px]">
        <View className="gap-y-0.5 mx-2">
          <Text className="text-20 text-emphasizedFont font-600">{signUpState.nickname}님,</Text>
          <Text className="text-20 text-emphasizedFont font-600">cozymate에 오신걸 환영해요!</Text>
        </View>
      </View>

      <View className="mt-[104px] mx-auto">{getPersona(signUpState.persona, 300, 300)}</View>

      <View className="absolute bottom-[42px] w-full px-[22px]">
        <BottomButton
          buttonText="cozymate 바로가기"
          disabled={false}
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
        />
      </View>
    </SafeAreaView>
  );
}
