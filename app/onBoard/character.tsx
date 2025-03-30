import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BottomButton from '@/components/common/bottomButton';
import CharacterList from '@/components/common/characterList';
import { useSignUpStore } from '@/zustand/member/member';

export default function Character() {
  const router = useRouter();

  const { setSignUpState } = useSignUpStore();

  const [persona, setPersona] = useState<number>(0);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mt-14 gap-y-[24px] px-[20px]">
        <View className="gap-y-0.5 mx-1">
          <Text className="text-20 text-emphasizedFont font-600">cozymate와 함께할</Text>
          <Text className="text-20 text-emphasizedFont font-600">캐릭터를 선택해주세요!</Text>
        </View>

        <CharacterList value={persona} handleValue={(e: number) => setPersona(e)} />
      </View>

      <View className="absolute bottom-[42px] w-full px-[22px]">
        <BottomButton
          buttonText="다음"
          disabled={persona === 0}
          onPress={() => {
            router.push('/onBoard/chipSelect');
            setSignUpState({ persona });
          }}
        />
      </View>
    </SafeAreaView>
  );
}
