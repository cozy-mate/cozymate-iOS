import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import SentRequestComponent from '@/components/cozyHome/sentRequest';

export default function SentRequest() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="gap-y-[20px]">
        <View className="px-[20px]">
          <BackHeaderComponent />
        </View>
        <SentRequestComponent />
      </View>
    </SafeAreaView>
  );
}
