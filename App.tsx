import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppInner from './AppInner';
import { linking } from '@config/deepLinkConfig';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
    },
  },
});

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      notifee.displayNotification({
        title: typeof remoteMessage?.notification?.title === 'string' ? remoteMessage.notification.title : '알림',
        body: typeof remoteMessage?.notification?.body === 'string' ? remoteMessage.notification.body : '새로운 메시지가 도착했습니다.',
        ios: {
          sound: 'default',
        },
        data: remoteMessage?.data,

      });
    });

    return unsubscribe;
  }, []);


  return (
    <SafeAreaProvider>
      <NavigationContainer
        onStateChange={() => { Toast.hide(); }}
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
