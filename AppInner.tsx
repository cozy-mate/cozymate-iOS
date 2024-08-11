import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@type/param/rootStack';
import { LoginStackParamList } from '@type/param/loginStack';

import SignInScreen from 'src/screens/signIn/signIn';

import PersonalInfoInputScreen from 'src/screens/onBoard/personalInfo';
import CharacterInputScreen from 'src/screens/onBoard/character';
import CompleteScreen from 'src/screens/onBoard/complete';

import MainScreen from 'src/screens/main';

import CozyHomeScreen from 'src/screens/cozyHome/cozyHome';
import SelectCharacterScreen from 'src/screens/createRoom/selectCharacter';
import CompleteCreateRoomScreen from 'src/screens/createRoom/completeCreate';

import RoomMateScreen from 'src/screens/roomMate/roomMate';
import CreateRoomScreen from 'src/screens/createRoom/createRoom';
import UserDetailScreen from 'src/screens/userDetail/userDetail';
import RoomMainScreen from 'src/screens/roomMain/roomMain';
import TodoListScreen from 'src/screens/todoList/todoList';
import SchoolAuthenticationScreen from 'src/screens/findRoommate/schoolAuthentication';

import MyPageScreen from 'src/screens/myPage/myPage';

import LifeStyleOnboardingScreen from 'src/screens/lifeStyle/onBoarding';
import BasicLifeStyleScreen from 'src/screens/lifeStyle/basicInformation';
import EssentialLifeStyleScreen from 'src/screens/lifeStyle/essentialInformation';
import FeedMainScreen from 'src/screens/feed/feedMain';
import FeedEditScreen from 'src/screens/feed/feedEdit';
import FeedViewScreen from 'src/screens/feed/feedView';
import FeedCreateScreen from 'src/screens/feed/feedCreate';
import { useRecoilState } from 'recoil';
import { loggedInState } from '@recoil/recoil';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import JoinRoomScreen from 'src/screens/joinRoom/joinRoom';
import WaitingRoomScreen from 'src/screens/waitingRoom/waitingRoom';

const rootStack = createNativeStackNavigator<RootStackParamList>();
const loginStack = createNativeStackNavigator<LoginStackParamList>();

function AppInner() {
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);

  return (
    <GestureHandlerRootView>
      {loggedIn ? (
        <loginStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
          <loginStack.Screen name="MainScreen" component={MainScreen} />
          <loginStack.Screen name="CozyHomeScreen" component={CozyHomeScreen} />
          <loginStack.Screen name="SelectCharacterScreen" component={SelectCharacterScreen} />
          <loginStack.Screen name="CompleteCreateRoomScreen" component={CompleteCreateRoomScreen} />

          <loginStack.Screen
            name="SchoolAuthenticationScreen"
            component={SchoolAuthenticationScreen}
          />

          <loginStack.Screen name="MyPageScreen" component={MyPageScreen} />

          <loginStack.Screen
            name="LifeStyleOnboardingScreen"
            component={LifeStyleOnboardingScreen}
          />
          <loginStack.Screen name="BasicLifeStyleScreen" component={BasicLifeStyleScreen} />
          <loginStack.Screen name="EssentialLifeStyleScreen" component={EssentialLifeStyleScreen} />

          <loginStack.Screen name="RoomMainScreen" component={RoomMainScreen} />
          <loginStack.Screen name="CreateRoomScreen" component={CreateRoomScreen} />
          <loginStack.Screen name="JoinRoomScreen" component={JoinRoomScreen} />
          <loginStack.Screen name="WaitingRoomScreen" component={WaitingRoomScreen} />

          <loginStack.Screen name="TodoListScreen" component={TodoListScreen} />

          <loginStack.Screen name="RoomMateScreen" component={RoomMateScreen} />
          <loginStack.Screen name="UserDetailScreen" component={UserDetailScreen} />

          <loginStack.Screen name="FeedMainScreen" component={FeedMainScreen} />
          <loginStack.Screen name="FeedEditScreen" component={FeedEditScreen} />
          <loginStack.Screen name="FeedViewScreen" component={FeedViewScreen} />
          <loginStack.Screen name="FeedCreateScreen" component={FeedCreateScreen} />
        </loginStack.Navigator>
      ) : (
        <rootStack.Navigator screenOptions={{ headerShown: false }}>
          <rootStack.Screen name="SignInScreen" component={SignInScreen} />
          <rootStack.Screen name="PersonalInfoInputScreen" component={PersonalInfoInputScreen} />
          <rootStack.Screen name="CharacterInputScreen" component={CharacterInputScreen} />
          <rootStack.Screen name="CompleteScreen" component={CompleteScreen} />
        </rootStack.Navigator>
      )}
    </GestureHandlerRootView>
  );
}

export default AppInner;
