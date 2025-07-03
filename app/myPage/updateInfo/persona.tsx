import { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import PersonaListComponent from '@/components/common/personaList';
import { useGetMemberProfile, useUpdateMemberInfo } from '@/hooks/member/member';
import BottomButtonComponent from '@/components/common/bottomButton';

export default function PersonaUpdate() {
  const { data } = useGetMemberProfile();

  const [persona, setPersona] = useState<number>(data.result.persona);

  const { mutateAsync: updateInfo } = useUpdateMemberInfo();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="gap-y-[8px] px-[20px]">
        <BackHeaderComponent />

        <PersonaListComponent
          title={['cozymate와 함께할', '캐릭터를 선택해주세요!']}
          value={persona}
          handleValue={(e: number) => setPersona(e)}
        />
      </View>

      <BottomButtonComponent
        buttonText="확인"
        onPress={() => updateInfo({ ...data.result, persona: persona })}
        color={persona === 0 ? 'GRAY' : 'BLUE'}
        disabled={persona === 0}
      />
    </SafeAreaView>
  );
}
