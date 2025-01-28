import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import analytics from '@react-native-firebase/analytics';
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

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
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
