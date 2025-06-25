import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import CharacterList from '@/components/common/characterList';
import BottomButtonComponent from '@/newComponents/common/bottomButton';
import { useSignUpStore } from '@/zustand/member/member';

export default function Character() {
  const router = useRouter();

  const { setSignUpState } = useSignUpStore();

  const [persona, setPersona] = useState<number>(0);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="gap-y-[24px] px-[20px]">
        <View className="gap-y-[8px]">
          <BackHeaderComponent />
          <View className="gap-y-[2px] mx-[4px]">
            <Text className="text-20 text-emphasizedFont font-600">cozymate와 함께할</Text>
            <Text className="text-20 text-emphasizedFont font-600">캐릭터를 선택해주세요!</Text>
          </View>
        </View>
        <CharacterList value={persona} handleValue={(e: number) => setPersona(e)} />
      </View>

      <BottomButtonComponent
        buttonText="다음"
        onPress={() => {
          router.push('/(onBoard)/chipSelect');
          setSignUpState({ persona });
        }}
        color={persona === 0 ? 'GRAY' : 'BLUE'}
        disabled={persona === 0}
      />
    </SafeAreaView>
  );
}
