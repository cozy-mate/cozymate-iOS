import { RecoilRoot } from 'recoil';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppInner from './AppInner';

const queryClient = new QueryClient();
//   {
//   defaultOptions: {
//     queries: {
//       staleTime: 0,
//     },
//   },
// }

function App(): React.JSX.Element {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (SplashScreen) {
        SplashScreen.hide();
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <NavigationContainer>
          <QueryClientProvider client={queryClient}>
            <AppInner />
          </QueryClientProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </RecoilRoot>
  );
}

export default App;
