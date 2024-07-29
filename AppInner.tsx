import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignInScreen from 'src/screens/signIn/signIn';
import OnBoardScreen from 'src/screens/onBoard/onBoard';
import { RootStackParamList } from '@type/param/stack';
import RoomMateScreen from 'src/screens/roomMate/roomMate';
import CreateRoomScreen from 'src/screens/createRoom/createRoom';
import UserInfoScreen from 'src/screens/userInfo/userInfo';
import UserDetailScreen from 'src/screens/userDetail/userDetail';
import RoomMainScreen from 'src/screens/roomMain/roomMain';
import TodoListScreen from 'src/screens/todoList/todoList';
import CozyHomeScreen from 'src/screens/cozyHome/cozyHome';
import SchoolAuthentication from 'src/screens/findRoommate/schoolAuthentication';
import BottomNavBar from 'src/layout/bottomNavBar';

function AppInner() {
  const stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="SignInScreen" component={SignInScreen} />
      <stack.Screen name="OnBoardScreen" component={OnBoardScreen} />

      <stack.Screen name="BottomNavBar" component={BottomNavBar} />
      <stack.Screen name="CozyHomeScreen" component={CozyHomeScreen} />
      <stack.Screen name="SchoolAuthenticationScreen" component={SchoolAuthentication} />

      <stack.Screen name="RoomMainScreen" component={RoomMainScreen} />
      <stack.Screen name="CreateRoomScreen" component={CreateRoomScreen} />
      <stack.Screen name="TodoListScreen" component={TodoListScreen} />

      <stack.Screen name="RoomMateScreen" component={RoomMateScreen} />
      <stack.Screen name="UserInfoScreen" component={UserInfoScreen} />
      <stack.Screen name="UserDetailScreen" component={UserDetailScreen} />
    </stack.Navigator>
  );
}

export default AppInner;
