import LottieView from 'lottie-react-native';
import React, { useRef, useState, useEffect } from 'react';
import {
  Text,
  View,
  FlatList,
  Pressable,
  Dimensions,
  SafeAreaView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

import LoadingComponent from '@components/commonComponents/loading';

import useFcm from '@hooks/useFcm';
import { useAppleLogin, useKakaoLogin } from '@hooks/api/member';

import { SignInScreenProps } from '@type/param/rootStack';

import KakaoLogo from '@assets/signIn/kakaoLogo.svg';
import AppleLogo from '@assets/signIn/appleLogo.svg';

const SignInScreen = ({ navigation }: SignInScreenProps) => {
  const width = Dimensions.get('screen').width;

  const { getDeviceId, resetFcmToken } = useFcm();

  useEffect(() => {
    // 같은 디바이스면 같은 값을 내는 순수 함수
    getDeviceId();
    resetFcmToken();
  }, [getDeviceId, resetFcmToken]);

  const { mutateAsync: kakaoLogin, isPending: kakaoLoginPending } = useKakaoLogin(navigation);
  const { mutateAsync: appleLogin, isPending: appleLoginPending } = useAppleLogin(navigation);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList>(null);

  const items = [
    {
      index: 1,
      title: '나와 꼭 맞는 룸메이트 찾기',
      subtitle: '정형화된 라이프스타일로\n나와 꼭 맞는 룸메이트를 쉽고 빠르게 찾아봐요',
      path: require('@assets/lottie/findRoomMate.json'),
      duration: 5,
    },
    {
      index: 2,
      title: '학교인증으로 신뢰성 UP!',
      subtitle: '학교 이메일을 통한 학교 인증으로,\n신뢰성을 높였어요',
      path: require('@assets/lottie/schoolAuthentication.json'),
      duration: 5,
    },
    {
      index: 3,
      title: '롤앤룰로 공동체 생활을 더 윤택하게!',
      subtitle: '우리방의 역할과 규칙을 정하고,\n서로 역할을 잘 수행하고 있는지 확인할 수 있어요',
      path: require('@assets/lottie/roleNrule.json'),
      duration: 5,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % items.length;
      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, items[currentIndex].duration * 1000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(newIndex);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {(kakaoLoginPending || appleLoginPending) && <LoadingComponent />}

      <View className="flex flex-1 flex-col justify-between">
        <FlatList
          ref={flatListRef}
          data={items}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          keyExtractor={(item) => item.index.toString()}
          renderItem={({ item }) => (
            <View className="mx-auto mt-12 flex flex-1 flex-col items-center" style={{ width }}>
              <LottieView source={item.path} style={{ width, height: 300 }} autoPlay loop={false} />
              <Text className="mb-[18px] mt-4 text-center text-xl font-bold text-emphasizedFont">
                {item.title}
              </Text>
              <Text className="mb-11 text-center text-sm font-medium text-basicFont">
                {item.subtitle}
              </Text>
            </View>
          )}
        />

        <View className="mt-[25px] flex flex-row justify-center space-x-2">
          {items.map((_, index) => (
            <View
              key={index}
              className={`${
                index === currentIndex ? 'w-4 bg-main1' : 'w-2 bg-disabled'
              } h-2 rounded-full`}
            />
          ))}
        </View>

        <View className="mx-9 mb-[57px] mt-[67px] flex flex-col space-y-3">
          <Pressable
            className="flex-row items-center justify-center rounded-[33px] bg-kakaoyellow px-6 py-4"
            onPress={() => kakaoLogin()}
          >
            <KakaoLogo className="mr-2" />
            <Text className="text-base font-semibold text-black">카카오톡으로 계속하기</Text>
          </Pressable>

          <Pressable
            className="flex-row items-center justify-center rounded-[33px] bg-appleblack px-6 py-4"
            onPress={() => appleLogin()}
          >
            <AppleLogo className="mr-4" />
            <Text className="text-center text-base font-semibold text-white">Apple로 계속하기</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
