import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as ExpoDevice from 'expo-device';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { Text, TextInput, View, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host, Portal } from 'react-native-portalize';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { useSyncQueriesExternal } from 'react-query-external-sync';

import { toastConfig } from '@/config/toastConfig';
import { useAutoLogin } from '@/hooks/autoLogin';
import { initGlobalThis } from '@/lib/initGlobalThis';
import FCMProvider from '@/providers/FCMProvider';
import { TrackerProvider } from '@/providers/TrackerProvider';
import ScreenTracker from '@/utils/ga/screenTracker';
import '../global.css';
import { useMemberStore } from '@/zustand/store';

initGlobalThis();

const kakaoNativeAppKey = process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY || '';

// https://docs.swmansion.com/react-native-reanimated/docs/debugging/logger-configuration/
configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean };
}
interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean };
}
(Text as unknown as TextWithDefaultProps).defaultProps =
  (Text as unknown as TextWithDefaultProps).defaultProps || {};
(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling = false;
(TextInput as unknown as TextInputWithDefaultProps).defaultProps =
  (TextInput as unknown as TextInputWithDefaultProps).defaultProps || {};
(TextInput as unknown as TextInputWithDefaultProps).defaultProps!.allowFontScaling = false;

const queryClient = new QueryClient();

export default function RootLayout() {
  const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(false);

  useAutoLogin();

  useSyncQueriesExternal({
    queryClient,
    socketURL: 'http://localhost:42831', // Default port for React Native DevTools
    deviceName: Platform?.OS || 'ios',
    platform: Platform?.OS || 'ios',
    deviceId: Platform?.OS || 'ios',
    isDevice: ExpoDevice.isDevice,
    asyncStorage: AsyncStorage,
  });

  useEffect(() => {
    // if (appLoaded && fontsLoaded) {
    initializeKakaoSDK(kakaoNativeAppKey);
    // SplashScreen.hideAsync();
    //}

    GoogleSignin.configure({});
  }, []);

  const { isLoggedIn } = useMemberStore();

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <FCMProvider appLoaded={isAnimationFinished}>
          <TrackerProvider>
            <ScreenTracker />
            <Host>
              <Stack>
                <Stack.Protected guard={!isLoggedIn}>
                  {/* 온보딩 화면 */}
                  <Stack.Screen name="(onBoard)" options={{ headerShown: false }} />
                </Stack.Protected>

                <Stack.Protected guard={isLoggedIn}>
                  {/* 메인 화면 */}
                  <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

                  {/* 라이프스타일 화면 */}
                  <Stack.Screen name="lifeStyle" options={{ headerShown: false }} />

                  {/* 알림 화면 */}
                  <Stack.Screen name="notification" options={{ headerShown: false }} />

                  {/* 쪽지방 화면 */}
                  <Stack.Screen name="message" options={{ headerShown: false }} />

                  {/* 유저 관련 화면 */}
                  <Stack.Screen name="user" options={{ headerShown: false }} />

                  {/* 방 관련 화면 */}
                  <Stack.Screen name="room" options={{ headerShown: false }} />

                  {/* 롤앤룰 화면 */}
                  <Stack.Screen name="roleNRule" options={{ headerShown: false }} />

                  {/* 피드 화면 */}
                  <Stack.Screen name="feed" options={{ headerShown: false }} />

                  {/* 마이페이지 화면 */}
                  <Stack.Screen name="myPage" options={{ headerShown: false }} />
                </Stack.Protected>

                <Stack.Screen name="+not-found" />
              </Stack>

              {!isAnimationFinished && (
                <Portal>
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 9999,
                    }}
                  >
                    <LottieView
                      source={require('@/assets/lotties/splash.json')}
                      style={{
                        flex: 1,
                      }}
                      resizeMode="cover"
                      autoPlay={true}
                      loop={false}
                      onAnimationFinish={() => {
                        setTimeout(() => setIsAnimationFinished(true), 2000);
                      }}
                    />
                  </View>
                </Portal>
              )}
              <StatusBar style="auto" />
            </Host>
          </TrackerProvider>
        </FCMProvider>
      </QueryClientProvider>

      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}
