import React from 'react';
import AppInner from './AppInner';

import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RecoilRoot } from 'recoil';

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <NavigationContainer>
            <AppInner />
          </NavigationContainer>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </RecoilRoot>
  );
}

export default App;
