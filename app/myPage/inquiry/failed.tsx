import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BackHeaderComponent from '@/components/common/backHeader';

export default function InquiryFailed() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackHeaderComponent />

      <Text>문의하기에 실패했어요{'\n'}다시 시도해주세요..</Text>
    </SafeAreaView>
  );
}
