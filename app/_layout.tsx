import { initializeKakaoSDK } from '@react-native-kakao/core';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Text, TextInput, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Host, Portal } from 'react-native-portalize';
import Toast from 'react-native-toast-message';

import { toastConfig } from '@/config/toastConfig';
import { useAutoLogin } from '@/hooks/autoLogin';
import { useColorScheme } from '@/hooks/useColorScheme';
import { initGlobalThis } from '@/lib/initGlobalThis';
import AuthProvider from '@/providers/AuthProvider';
import FCMProvider from '@/providers/FCMProvider';
import { TrackerProvider } from '@/providers/TrackerProvider';
import ScreenTracker from '@/utils/ga/screenTracker';

import '../global.css';

initGlobalThis();

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

const kakaoNativeAppKey = process.env.EXPO_PUBLIC_KAKAO_NATIVE_APP_KEY || '';

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
  const colorScheme = useColorScheme();

  const [appLoaded, setAppLoaded] = useState<boolean>(false);
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.otf'),
    'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.otf'),
    'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.otf'),
    'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.otf'),
  });
  const [isAnimationFinished, setIsAnimationFinished] = useState<boolean>(false);

  useAutoLogin(setAppLoaded);

  useEffect(() => {
    if (appLoaded && fontsLoaded) {
      initializeKakaoSDK(kakaoNativeAppKey);
      // SplashScreen.hideAsync();
    }
  }, [appLoaded, fontsLoaded]);

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider appLoaded={appLoaded}>
            <FCMProvider appLoaded={appLoaded}>
              <TrackerProvider>
                <ScreenTracker />
                <Host>
                  <Stack>
                    {/* 온보딩 화면 */}
                    <Stack.Screen name="(onBoard)" options={{ headerShown: false }} />

                    {/* 메인 화면 */}
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

                    {/* 라이프스타일 화면 */}
                    <Stack.Screen name="lifeStyle" options={{ headerShown: false }} />

                    {/* 알림 화면 */}
                    <Stack.Screen name="notification" options={{ headerShown: false }} />

                    {/* 쪽지방 화면 */}
                    <Stack.Screen name="chat" options={{ headerShown: false }} />

                    {/* 유저 관련 화면 */}
                    <Stack.Screen name="user" options={{ headerShown: false }} />

                    {/* 방 관련 화면 */}
                    <Stack.Screen name="room" options={{ headerShown: false }} />

                    {/* 롤앤룰 화면 */}
                    <Stack.Screen name="roleNRule" options={{ headerShown: false }} />

                    {/* 마이페이지 화면 */}
                    <Stack.Screen name="myPage" options={{ headerShown: false }} />

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
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>

      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}
