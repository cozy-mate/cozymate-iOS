import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from './src/screens/signIn/signIn';
import OnBoardScreen from 'src/screens/onBoard/onBoard';
import { SignInParamList } from '@type/param/stack';

function AppInner() {
  const stack = createNativeStackNavigator<SignInParamList>();

  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="SignInScreen" component={SignInScreen} />
      <stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
    </stack.Navigator>
  );
}

export default AppInner;
