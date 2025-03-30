import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import RoomMateComponent from '@/components/roomMate/roomMate';

export default function Roommate() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="gap-y-[16px] flex-1">
        <View className="px-[20px]">
          <BackHeaderComponent />
        </View>

        <RoomMateComponent />
      </View>
    </SafeAreaView>
  );
}
