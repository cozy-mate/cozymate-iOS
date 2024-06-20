import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from './src/screens/signIn/signIn';
import OnBoardScreen from './src/screens/onBoard/onBoard';
import { SignInParamList } from '@type/param/stack';
import RoomMateScreen from './src/screens/roomMate/roomMate';
import CreateRoomScreen from './src/screens/createRoom/createRoom';

function AppInner() {
  const stack = createNativeStackNavigator<SignInParamList>();

  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="SignInScreen" component={SignInScreen} />
      <stack.Screen name="OnBoardScreen" component={OnBoardScreen} />
      <stack.Screen name="RoomMateScreen" component={RoomMateScreen} />
      <stack.Screen name="CreateRoomScreen" component={CreateRoomScreen} />
    </stack.Navigator>
  );
}

export default AppInner;
