import { Suspense } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import Background from '@/assets/images/cozyBot/background.svg';
import RoomInfoComponent from '@/components/cozyBot/RoomInfo';
import RoomLogComponent from '@/components/cozyBot/RoomLog';

export default function CozyBot() {
  return (
    <Suspense>
      <SafeAreaView className="flex-1 bg-subColor1">
        <Background style={{ position: 'absolute' }} />

        <RoomInfoComponent />
        <RoomLogComponent />
      </SafeAreaView>
    </Suspense>
  );
}
