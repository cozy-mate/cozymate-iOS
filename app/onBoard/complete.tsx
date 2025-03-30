import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BottomButton from '@/components/common/bottomButton';

export default function Complete() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mt-14 gap-y-[24px] px-[20px]">
        <View className="gap-y-0.5 mx-2">
          <Text className="text-20 text-emphasizedFont font-600">델로님,</Text>
          <Text className="text-20 text-emphasizedFont font-600">cozymate에 오신걸 환영해요!</Text>
        </View>
      </View>

      <View className="absolute bottom-[42px] w-full px-[22px]">
        <BottomButton
          buttonText="cozymate 바로가기"
          disabled={false}
          onPress={() => router.push('/(tabs)/home')}
        />
      </View>
    </SafeAreaView>
  );
}
