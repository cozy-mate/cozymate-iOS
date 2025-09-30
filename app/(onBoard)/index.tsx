import LottieView from 'lottie-react-native';
import { Dimensions, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';

import AppleLogo from '@/assets/images/common/appleLogo.svg';
import GoogleLogo from '@/assets/images/common/googleLogo.svg';
import KakaoLogo from '@/assets/images/common/kakaoLogo.svg';
import LoadingComponent from '@/components/common/loading';
import { useAppleLogin, useGoogleLogin, useKakaoLogin } from '@/hooks/auth/auth';

export default function HomeScreen() {
  const { mutateAsync: kakaoLogin, isPending: kakaoPending } = useKakaoLogin();
  const { mutateAsync: appleLogin, isPending: applePending } = useAppleLogin();
  const { mutateAsync: googleLogin, isPending: googlePending } = useGoogleLogin();

  const progress = useSharedValue<number>(0);

  const width = Dimensions.get('screen').width;
  const isSmallSize = Dimensions.get('screen').height <= 667;

  const LottieItems = [
    {
      index: 1,
      title: '나와 꼭 맞는 룸메이트 찾기',
      subtitle: '정형화된 라이프스타일로\n나와 꼭 맞는 룸메이트를 쉽고 빠르게 찾아봐요',
      path: require('@/assets/lotties/findRoomMate.json'),
      width: width,
      height: isSmallSize ? 285 : 315,
    },
    {
      index: 2,
      title: '학교인증으로 신뢰성 UP!',
      subtitle: '학교 이메일을 통한 학교 인증으로,\n신뢰성을 높였어요',
      path: require('@/assets/lotties/schoolAuthentication.json'),
      width: isSmallSize ? 285 : 277,
      height: isSmallSize ? 285 : 283,
    },
    {
      index: 3,
      title: '롤앤룰로 공동체 생활을 더 윤택하게!',
      subtitle: '우리방의 역할과 규칙을 정하고,\n서로 역할을 잘 수행하고 있는지 확인할 수 있어요',
      path: require('@/assets/lotties/roleNrule.json'),
      width: isSmallSize ? 285 : 277,
      height: isSmallSize ? 285 : 283,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {(kakaoPending || applePending || googlePending) && <LoadingComponent />}

      <Carousel
        width={width}
        height={isSmallSize ? 450 : 500}
        loop={true}
        data={LottieItems}
        snapEnabled={true}
        pagingEnabled={true}
        autoPlay={true}
        autoPlayInterval={5000}
        onProgressChange={progress}
        renderItem={({ item }) => (
          <View
            className={`flex flex-col justify-between items-center h-[400px] ${isSmallSize ? 'mt-[24px]' : 'mt-[50px]'} `}
          >
            <LottieView
              source={item.path}
              style={{
                width: item.width,
                height: item.height,
              }}
              resizeMode={item.index === 1 ? 'cover' : 'contain'}
              autoPlay
              loop
            />
            <View className="gap-y-[12px]">
              <Text className="Bold20 text-emphasizedFont text-center">{item.title}</Text>
              <Text className="Medium14 text-basicFont text-center">{item.subtitle}</Text>
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

      <View
        className={`absolute ${isSmallSize ? 'bottom-[32px]' : 'bottom-[91px]'}  gap-y-[12px] w-full px-[38px]`}
      >
        <TouchableOpacity
          className="flex-row gap-x-[8px] items-center justify-center rounded-[33px] bg-kakaoyellow px-[24px] py-[16px]"
          onPress={() => kakaoLogin()}
        >
          <KakaoLogo />
          <Text className="Semibold16 text-black">카카오톡으로 계속하기</Text>
        </TouchableOpacity>

        {Platform.OS === 'ios' ? (
          <TouchableOpacity
            className="flex-row gap-x-[8px] items-center justify-center rounded-[33px] bg-appleblack px-[24px] py-[16px]"
            onPress={() => appleLogin()}
          >
            <AppleLogo />
            <Text className="Semibold16 text-white">Apple로 계속하기</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="flex-row gap-x-[8px] items-center justify-center rounded-[33px] bg-white px-[24px] py-[16px]"
            onPress={() => googleLogin()}
          >
            <GoogleLogo />
            <Text className="Semibold16 text-black">Google로 계속하기</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}
