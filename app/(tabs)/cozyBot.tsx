import { Suspense } from 'react';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Background from '@/assets/images/cozyBot/background.svg';
import RoomInfoComponent from '@/components/cozyBot/RoomInfo';
import RoomLogComponent from '@/components/cozyBot/RoomLog';

export default function CozyBot() {
  const width = Dimensions.get('screen').width;

  return (
    <Suspense>
      <SafeAreaView className="flex-1 bg-subColor1">
        <Background style={{ position: 'absolute' }} width={width} />

        <RoomInfoComponent />
        <RoomLogComponent />
      </SafeAreaView>
    </Suspense>
  );
}
