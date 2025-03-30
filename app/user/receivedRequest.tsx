import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';
import ReceivedRequestComponent from '@/components/cozyHome/receivedRequest';

export default function ReceivedRequest() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="gap-y-[20px]">
        <View className="px-[20px]">
          <BackHeaderComponent />
        </View>
        <ReceivedRequestComponent />
      </View>
    </SafeAreaView>
  );
}
