import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import BottomButtonComponent from '@/components/common/bottomButton';
import PersonaListComponent from '@/components/common/personaList';
import {
  //useSignUpStore,
  useSignUpV2Store,
} from '@/zustand/member/member';

export default function Character() {
  const router = useRouter();

  // const { signUpState, setSignUpState } = useSignUpStore();
  const { signUpState, setSignUpState } = useSignUpV2Store();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="gap-y-[8px] px-[20px]">
        <BackHeaderComponent />

        <PersonaListComponent
          title={['cozymate와 함께할', '캐릭터를 선택해주세요!']}
          value={signUpState.persona}
          handleValue={(e: number) => setSignUpState({ persona: e })}
        />
      </View>

      <BottomButtonComponent
        buttonText="다음"
        onPress={() => {
          router.push('/(onBoard)/chipSelect');
        }}
        color={signUpState.persona === 0 ? 'GRAY' : 'BLUE'}
        disabled={signUpState.persona === 0}
      />
    </SafeAreaView>
  );
}
