import { useRouter } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import PersonaListComponent from '@/components/common/personaList';
import BottomButtonComponent from '@/components/common/bottomButton';
import { useCreateRoomStore } from '@/zustand/room/room';

export default function CreateRoomSelectPersona() {
  const router = useRouter();

  const { createRoomInfo, setCreateRoomInfo } = useCreateRoomStore();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="gap-y-[8px] px-[20px]">
        <BackHeaderComponent />

        <PersonaListComponent
          title={['우리방을 대표할', '캐릭터를 선택해주세요!']}
          value={createRoomInfo.persona}
          handleValue={(e: number) => setCreateRoomInfo({ persona: e })}
        />
      </View>

      <BottomButtonComponent
        buttonText="확인"
        onPress={() => router.back()}
        color={createRoomInfo.persona === 0 ? 'GRAY' : 'BLUE'}
        disabled={createRoomInfo.persona === 0}
      />
    </SafeAreaView>
  );
}
