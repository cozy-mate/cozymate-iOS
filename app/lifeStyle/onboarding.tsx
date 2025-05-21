import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import StarImage from '@/assets/images/lifeStyle/star.svg';
import BottomButtonComponent from '@/newComponents/common/bottomButton';
import { useMemberStore } from '@/zustand/member/member';

export default function LifeStyleOnboarding() {
  const router = useRouter();

  const { memberState } = useMemberStore();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="pt-[56px] px-[20px] gap-y-[92px]">
        <View className="gap-y-0.5 mx-1">
          <Text className="text-20 text-basicFont font-700">
            <Text className="text-mainColor">{memberState.nickname}</Text>님과
          </Text>
          <Text className="text-20 text-basicFont font-700">딱 맞는 라이프스타일을 가진</Text>
          <Text className="text-20 text-basicFont font-700">
            <Text className="text-mainColor">cozymate</Text>를 찾아볼까요?
          </Text>
        </View>

        <View className="flex items-center">
          <StarImage />
        </View>
      </View>

      <BottomButtonComponent
        buttonText="내 라이프 스타일 입력하러 가기"
        onPress={() => router.push('/lifeStyle/basicInfo')}
        color="BLUE"
        disabled={false}
      />
    </SafeAreaView>
  );
}
