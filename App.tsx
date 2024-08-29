import React from 'react';
import AppInner from './AppInner';

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      retry: false,
    },
  },
});

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <NavigationContainer>
            <QueryClientProvider client={queryClient}>
              <AppInner />
            </QueryClientProvider>
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </RecoilRoot>
  );
}

export default App;
