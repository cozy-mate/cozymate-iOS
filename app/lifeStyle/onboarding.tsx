import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import XIcon from '@/assets/icons/x.svg';
import StarImage from '@/assets/images/lifeStyle/star.svg';
import BottomButtonComponent from '@/components/common/bottomButton';
import { useMemberStore } from '@/zustand/store';

export default function LifeStyleOnboarding() {
  const router = useRouter();

  const { memberInfo } = useMemberStore();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-[20px] gap-y-[40px]">
        <Pressable onPress={() => router.back()} className="p-[11px] self-end">
          <XIcon />
        </Pressable>

        <View className="gap-y-[92px]">
          <View className="gap-y-[4px] mx-[4px]">
            <Text className="Semibold20 text-basicFont">
              <Text className="text-mainColor">{memberInfo?.nickname ?? ''}</Text>님과
            </Text>
            <Text className="Semibold20 text-basicFont">딱 맞는 라이프스타일을 가진</Text>
            <Text className="Semibold20 text-basicFont">
              <Text className="text-mainColor">cozymate</Text>를 찾아볼까요?
            </Text>
          </View>

          <View className="flex items-center">
            <StarImage />
          </View>
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
