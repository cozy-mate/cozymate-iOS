import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useRecoilState } from 'recoil';
import { loggedInState } from '@recoil/recoil';

import MainScreen from 'src/screens/main';
import CozyHomeScreen from 'src/screens/cozyHome/cozyHome';
import RoomMainScreen from 'src/screens/roomMain/roomMain';
import TodoListScreen from 'src/screens/todoList/todoList';
import CreateTodoScreen from 'src/screens/todoList/createTodo';
import LifeStyleOnboardingScreen from 'src/screens/lifeStyle/onBoarding';
import BasicLifeStyleScreen from 'src/screens/lifeStyle/basicInformation';
import EssentialLifeStyleScreen from 'src/screens/lifeStyle/essentialInformation';
import AdditionalLifeStyleScreen from 'src/screens/lifeStyle/additionalInformation';
import CreateRoomScreen from 'src/screens/createRoom/createRoom';
import SelectCharacterScreen from 'src/screens/createRoom/selectCharacter';
import CompleteCreateRoomScreen from 'src/screens/createRoom/completeCreate';
import JoinRoomScreen from 'src/screens/joinRoom/joinRoom';
import WaitingRoomScreen from 'src/screens/waitingRoom/waitingRoom';
import SchoolAuthenticationScreen from 'src/screens/findRoommate/schoolAuthentication';
import RoomMateScreen from 'src/screens/roomMate/roomMate';
import UserDetailScreen from 'src/screens/userDetail/userDetail';
import FeedMainScreen from 'src/screens/feed/feedMain';
import FeedEditScreen from 'src/screens/feed/feedEdit';
import FeedViewScreen from 'src/screens/feed/feedView';
import FeedCreateScreen from 'src/screens/feed/feedCreate';
import MyPageScreen from 'src/screens/myPage/myPage';
import ChatScreen from 'src/screens/chatting/chat';
import ChatRoomScreen from 'src/screens/chatting/chatRoom';
import SendChatScreen from 'src/screens/chatting/sendChat';
import NotificationScreen from 'src/screens/notification/notification';

import SignInScreen from 'src/screens/signIn/signIn';
import PersonalInfoInputScreen from 'src/screens/onBoard/personalInfo';
import CharacterInputScreen from 'src/screens/onBoard/character';
import CompleteScreen from 'src/screens/onBoard/complete';

import { RootStackParamList } from '@type/param/rootStack';
import { StackParamList } from '@type/param/stack';

const rootStack = createNativeStackNavigator<RootStackParamList>();
const stack = createNativeStackNavigator<StackParamList>();

function AppInner() {
  const [loggedIn, setLoggedIn] = useRecoilState(loggedInState);

  return (
    <GestureHandlerRootView>
      {loggedIn ? (
        <stack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
          <stack.Screen name="MainScreen" component={MainScreen} />

          <stack.Screen name="CozyHomeScreen" component={CozyHomeScreen} />

          <stack.Screen name="RoomMainScreen" component={RoomMainScreen} />

          <stack.Screen name="TodoListScreen" component={TodoListScreen} />
          <stack.Screen name="CreateTodoScreen" component={CreateTodoScreen} />

          <stack.Screen name="LifeStyleOnboardingScreen" component={LifeStyleOnboardingScreen} />
          <stack.Screen name="BasicLifeStyleScreen" component={BasicLifeStyleScreen} />
          <stack.Screen name="EssentialLifeStyleScreen" component={EssentialLifeStyleScreen} />
          <stack.Screen name="AdditionalLifeStyleScreen" component={AdditionalLifeStyleScreen} />

          <stack.Screen name="CreateRoomScreen" component={CreateRoomScreen} />
          <stack.Screen name="SelectCharacterScreen" component={SelectCharacterScreen} />
          <stack.Screen name="CompleteCreateRoomScreen" component={CompleteCreateRoomScreen} />

          <stack.Screen name="JoinRoomScreen" component={JoinRoomScreen} />

          <stack.Screen name="WaitingRoomScreen" component={WaitingRoomScreen} />

          <stack.Screen name="SchoolAuthenticationScreen" component={SchoolAuthenticationScreen} />

          <stack.Screen name="RoomMateScreen" component={RoomMateScreen} />
          <stack.Screen name="UserDetailScreen" component={UserDetailScreen} />

          <stack.Screen name="FeedMainScreen" component={FeedMainScreen} />
          <stack.Screen name="FeedEditScreen" component={FeedEditScreen} />
          <stack.Screen name="FeedViewScreen" component={FeedViewScreen} />
          <stack.Screen name="FeedCreateScreen" component={FeedCreateScreen} />

          <stack.Screen name="MyPageScreen" component={MyPageScreen} />

          <stack.Screen name="ChatScreen" component={ChatScreen} />
          <stack.Screen name="ChatRoomScreen" component={ChatRoomScreen} />
          <stack.Screen name="SendChatScreen" component={SendChatScreen} />

          <stack.Screen name="NotificationScreen" component={NotificationScreen} />
        </stack.Navigator>
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
