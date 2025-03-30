import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import { initializeKakaoSDK } from '@react-native-kakao/core';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppInner from './AppInner';

import { linking } from '@config/deepLinkConfig';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
    },
  },
});

const kakaoNativeAppKey = process.env.KAKAO_NATIVE_APP_KEY || '';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();

    initializeKakaoSDK(kakaoNativeAppKey);
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer
        onStateChange={() => {
          Toast.hide();
        }}
        linking={linking}
      >
        <QueryClientProvider client={queryClient}>
          <AppInner />
        </QueryClientProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
