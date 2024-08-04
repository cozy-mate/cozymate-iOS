import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@type/param/stack';

import SignInScreen from 'src/screens/signIn/signIn';

import PersonalInfoInputScreen from 'src/screens/onBoard/personalInfo';
import CharacterInputScreen from 'src/screens/onBoard/character';
import CompleteScreen from 'src/screens/onBoard/complete';

import RoomMateScreen from 'src/screens/roomMate/roomMate';
import CreateRoomScreen from 'src/screens/createRoom/createRoom';
import UserInfoScreen from 'src/screens/userInfo/userInfo';
import UserDetailScreen from 'src/screens/userDetail/userDetail';
import RoomMainScreen from 'src/screens/roomMain/roomMain';
import TodoListScreen from 'src/screens/todoList/todoList';
import CozyHomeScreen from 'src/screens/cozyHome/cozyHome';
import SchoolAuthentication from 'src/screens/findRoommate/schoolAuthentication';
import BottomNavBar from 'src/layout/bottomNavBar';
import OnboardingScreen from 'src/screens/lifeStyle/onBoarding';
import BasicLifeStyleScreen from 'src/screens/lifeStyle/basicInformation';
import EssentialLifeStyleScreen from 'src/screens/lifeStyle/essentialInformation';

function AppInner() {
  const stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <stack.Navigator screenOptions={{ headerShown: false }}>
      <stack.Screen name="SignInScreen" component={SignInScreen} />
      <stack.Screen name="PersonalInfoInputScreen" component={PersonalInfoInputScreen} />
      <stack.Screen name="CharacterInputScreen" component={CharacterInputScreen} />
      <stack.Screen name="CompleteScreen" component={CompleteScreen} />

      <stack.Screen name="BottomNavBar" component={BottomNavBar} />
      <stack.Screen name="CozyHomeScreen" component={CozyHomeScreen} />
      <stack.Screen name="SchoolAuthenticationScreen" component={SchoolAuthentication} />

      <stack.Screen name="LifeStyleOnboardingScreen" component={OnboardingScreen} />
      <stack.Screen name="BasicLifeStyleScreen" component={BasicLifeStyleScreen} />
      <stack.Screen name="EssentialLifeStyleScreen" component={EssentialLifeStyleScreen} />

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
