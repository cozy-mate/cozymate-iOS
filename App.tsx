import React from 'react';
import { RecoilRoot } from 'recoil';
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
