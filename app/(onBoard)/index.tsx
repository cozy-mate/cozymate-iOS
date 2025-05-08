import LottieView from 'lottie-react-native';
import { Dimensions, Pressable, Text, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppleLogo from '@/assets/images/common/appleLogo.svg';
import KakaoLogo from '@/assets/images/common/kakaoLogo.svg';
import LoadingComponent from '@/components/common/loading';
import { useAppleLogin, useKakaoLogin } from '@/hooks/auth/auth';

export default function HomeScreen() {
  const { mutateAsync: kakaoLogin, isPending: kakaoPending } = useKakaoLogin();
  const { mutateAsync: appleLogin, isPending: applePending } = useAppleLogin();

  const progress = useSharedValue<number>(0);

  const width = Dimensions.get('screen').width;

  const LottieItems = [
    {
      index: 1,
      title: '나와 꼭 맞는 룸메이트 찾기',
      subtitle: '정형화된 라이프스타일로\n나와 꼭 맞는 룸메이트를 쉽고 빠르게 찾아봐요',
      path: require('@/assets/lotties/findRoomMate.json'),
      width: width,
      height: 315,
    },
    {
      index: 2,
      title: '학교인증으로 신뢰성 UP!',
      subtitle: '학교 이메일을 통한 학교 인증으로,\n신뢰성을 높였어요',
      path: require('@/assets/lotties/schoolAuthentication.json'),
      width: 277,
      height: 283,
    },
    {
      index: 3,
      title: '롤앤룰로 공동체 생활을 더 윤택하게!',
      subtitle: '우리방의 역할과 규칙을 정하고,\n서로 역할을 잘 수행하고 있는지 확인할 수 있어요',
      path: require('@/assets/lotties/roleNrule.json'),
      width: 277,
      height: 283,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {(kakaoPending || applePending) && <LoadingComponent />}

      <Carousel
        width={width}
        height={500}
        loop={true}
        data={LottieItems}
        snapEnabled={true}
        pagingEnabled={true}
        autoPlay={true}
        autoPlayInterval={5000}
        onProgressChange={progress}
        renderItem={({ item }) => (
          <View className="mt-[50px] flex flex-col justify-between items-center h-[400px]">
            <LottieView
              source={item.path}
              style={{
                width: item.width,
                height: item.height,
              }}
              autoPlay
              loop
            />
            <View className="gap-y-[12px]">
              <Text className="text-20 font-700 leading-20 text-emphasizedFont text-center">
                {item.title}
              </Text>
              <Text className="text-14 font-500 leading-14 text-basicFont text-center">
                {item.subtitle}
              </Text>
            </View>
          </View>
        )}
      />

      <Pagination.Custom
        progress={progress}
        data={LottieItems}
        dotStyle={{ backgroundColor: '#E6E6E6', borderRadius: 9999, width: 8, height: 8 }}
        activeDotStyle={{
          backgroundColor: '#68A4FF',
          borderRadius: 9999,
          width: 16,
          height: 8,
          overflow: 'hidden',
        }}
        containerStyle={{ gap: 8 }}
      />

      <View className="absolute bottom-[91px] gap-y-[12px] w-full px-[38px]">
        <Pressable
          className="flex-row gap-x-[8px] items-center justify-center rounded-[33px] bg-kakaoyellow px-6 py-4"
          onPress={() => kakaoLogin()}
        >
          <KakaoLogo />
          <Text className="text-16 font-semibold text-black">카카오톡으로 계속하기</Text>
        </Pressable>

        <Pressable
          className="flex-row gap-x-[8px] items-center justify-center rounded-[33px] bg-appleblack px-6 py-4"
          onPress={() => appleLogin()}
        >
          <AppleLogo />
          <Text className="text-center text-16 font-semibold text-white">Apple로 계속하기</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
