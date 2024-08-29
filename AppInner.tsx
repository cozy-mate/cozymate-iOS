import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@type/param/rootStack';
import { LoginStackParamList } from '@type/param/loginStack';
import { RoomStackParamList } from '@type/param/roomStack';

import SignInScreen from 'src/screens/signIn/signIn';

import PersonalInfoInputScreen from 'src/screens/onBoard/personalInfo';
import CharacterInputScreen from 'src/screens/onBoard/character';
import CompleteScreen from 'src/screens/onBoard/complete';

import MainScreen from 'src/screens/main';
import HasRoomMainScreen from 'src/screens/hasRoomMain';

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
import AdditionalLifeStyleScreen from 'src/screens/lifeStyle/additionalInformation';

import FeedMainScreen from 'src/screens/feed/feedMain';
import FeedEditScreen from 'src/screens/feed/feedEdit';
import FeedViewScreen from 'src/screens/feed/feedView';
import FeedCreateScreen from 'src/screens/feed/feedCreate';
import { useRecoilState } from 'recoil';
import { hasRoomState, loggedInState } from '@recoil/recoil';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import JoinRoomScreen from 'src/screens/joinRoom/joinRoom';
import WaitingRoomScreen from 'src/screens/waitingRoom/waitingRoom';

import CreateTodoScreen from 'src/screens/todoList/createTodo';

const rootStack = createNativeStackNavigator<RootStackParamList>();
const loginStack = createNativeStackNavigator<LoginStackParamList>();
const roomStack = createNativeStackNavigator<RoomStackParamList>();

function AppInner() {
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);
  const [hasRoom, setHasRoom] = useRecoilState(hasRoomState);

  return (
    <GestureHandlerRootView>
      {loggedIn ? (
        hasRoom.hasRoom ? (
          <roomStack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
            <roomStack.Screen name="MainScreen" component={HasRoomMainScreen} />
            <roomStack.Screen name="SelectCharacterScreen" component={SelectCharacterScreen} />
            <roomStack.Screen
              name="CompleteCreateRoomScreen"
              component={CompleteCreateRoomScreen}
            />

            <roomStack.Screen
              name="SchoolAuthenticationScreen"
              component={SchoolAuthenticationScreen}
            />

            <roomStack.Screen name="MyPageScreen" component={MyPageScreen} />

            <roomStack.Screen
              name="LifeStyleOnboardingScreen"
              component={LifeStyleOnboardingScreen}
            />
            <roomStack.Screen name="BasicLifeStyleScreen" component={BasicLifeStyleScreen} />
            <roomStack.Screen
              name="EssentialLifeStyleScreen"
              component={EssentialLifeStyleScreen}
            />
            <roomStack.Screen
              name="AdditionalLifeStyleScreen"
              component={AdditionalLifeStyleScreen}
            />

            <roomStack.Screen name="RoomMainScreen" component={RoomMainScreen} />
            <roomStack.Screen name="CreateRoomScreen" component={CreateRoomScreen} />
            <roomStack.Screen name="JoinRoomScreen" component={JoinRoomScreen} />
            <roomStack.Screen name="WaitingRoomScreen" component={WaitingRoomScreen} />

            <roomStack.Screen name="TodoListScreen" component={TodoListScreen} />
            <roomStack.Screen name="CreateTodoScreen" component={CreateTodoScreen} />

            <roomStack.Screen name="RoomMateScreen" component={RoomMateScreen} />
            <roomStack.Screen name="UserDetailScreen" component={UserDetailScreen} />

            <roomStack.Screen name="FeedMainScreen" component={FeedMainScreen} />
            <roomStack.Screen name="FeedEditScreen" component={FeedEditScreen} />
            <roomStack.Screen name="FeedViewScreen" component={FeedViewScreen} />
            <roomStack.Screen name="FeedCreateScreen" component={FeedCreateScreen} />
          </roomStack.Navigator>
        ) : (
          <loginStack.Navigator
            initialRouteName="MainScreen"
            screenOptions={{ headerShown: false }}
          >
            <loginStack.Screen name="MainScreen" component={MainScreen} />
            <loginStack.Screen name="CozyHomeScreen" component={CozyHomeScreen} />
            <loginStack.Screen name="SelectCharacterScreen" component={SelectCharacterScreen} />
            <loginStack.Screen
              name="CompleteCreateRoomScreen"
              component={CompleteCreateRoomScreen}
            />

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
            <loginStack.Screen
              name="EssentialLifeStyleScreen"
              component={EssentialLifeStyleScreen}
            />
            <loginStack.Screen
              name="AdditionalLifeStyleScreen"
              component={AdditionalLifeStyleScreen}
            />

            <loginStack.Screen name="CreateRoomScreen" component={CreateRoomScreen} />
            <loginStack.Screen name="JoinRoomScreen" component={JoinRoomScreen} />
            <loginStack.Screen name="WaitingRoomScreen" component={WaitingRoomScreen} />

            <loginStack.Screen name="RoomMateScreen" component={RoomMateScreen} />
            <loginStack.Screen name="UserDetailScreen" component={UserDetailScreen} />
          </loginStack.Navigator>
        )
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
