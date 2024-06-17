import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from './src/screens/signIn/signIn';

function AppInner() {
  return <SignInScreen />;
}

export default AppInner;
