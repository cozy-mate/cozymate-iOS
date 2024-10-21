import React from 'react';
import { useRecoilValue } from 'recoil';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from 'src/screens/main';
import ChatScreen from 'src/screens/chatting/chat';
import MyPageScreen from 'src/screens/myPage/myPage';
import SignInScreen from 'src/screens/signIn/signIn';
import MyInfoScreen from 'src/screens/myPage/myInfo';
import FeedMainScreen from 'src/screens/feed/feedMain';
import FeedEditScreen from 'src/screens/feed/feedEdit';
import FeedViewScreen from 'src/screens/feed/feedView';
import CompleteScreen from 'src/screens/onBoard/complete';
import CozyHomeScreen from 'src/screens/cozyHome/cozyHome';
import RoomMainScreen from 'src/screens/roomMain/roomMain';
import TodoListScreen from 'src/screens/todoList/todoList';
import JoinRoomScreen from 'src/screens/joinRoom/joinRoom';
import RoomMateScreen from 'src/screens/roomMate/roomMate';
import FeedCreateScreen from 'src/screens/feed/feedCreate';
import ChatRoomScreen from 'src/screens/chatting/chatRoom';
import SendChatScreen from 'src/screens/chatting/sendChat';
import ChipSelectScreen from 'src/screens/onBoard/chipSelect';
import CreateTodoScreen from 'src/screens/todoList/createTodo';
import CreateRoomScreen from 'src/screens/createRoom/createRoom';
import UserDetailScreen from 'src/screens/userDetail/userDetail';
import CharacterInputScreen from 'src/screens/onBoard/character';
import RoomDetailScreen from 'src/screens/roomDetail/roomDetail';
import WaitingRoomScreen from 'src/screens/waitingRoom/waitingRoom';
import LifeStyleEditScreen from 'src/screens/lifeStyle/lifeStyleEdit';
import NotificationScreen from 'src/screens/notification/notification';
import PersonalInfoInputScreen from 'src/screens/onBoard/personalInfo';
import LifeStyleOnboardingScreen from 'src/screens/lifeStyle/onBoarding';
import BasicLifeStyleScreen from 'src/screens/lifeStyle/basicInformation';
import RecommendRoomScreen from 'src/screens/recommendRoom/recommendRoom';
import SelectCharacterScreen from 'src/screens/createRoom/selectCharacter';
import CompleteCreateRoomScreen from 'src/screens/createRoom/completeCreate';
import EssentialLifeStyleScreen from 'src/screens/lifeStyle/essentialInformation';
import AdditionalLifeStyleScreen from 'src/screens/lifeStyle/additionalInformation';
import SchoolAuthenticationScreen from 'src/screens/findRoommate/schoolAuthentication';

import { loggedInState } from '@recoil/recoil';

import { StackParamList } from '@type/param/stack';
import { RootStackParamList } from '@type/param/rootStack';

const rootStack = createNativeStackNavigator<RootStackParamList>();
const stack = createNativeStackNavigator<StackParamList>();

function AppInner() {
  const loggedIn = useRecoilValue(loggedInState);

  return (
    <GestureHandlerRootView>
      {loggedIn ? (
        <stack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
          <stack.Screen name="MainScreen" component={MainScreen} />

          <stack.Screen name="CozyHomeScreen" component={CozyHomeScreen} />

          <stack.Screen name="RoomMainScreen" component={RoomMainScreen} />
          <stack.Screen name="RoomDetailScreen" component={RoomDetailScreen} />
          <stack.Screen name="RecommendRoomScreen" component={RecommendRoomScreen} />

          <stack.Screen name="TodoListScreen" component={TodoListScreen} />
          <stack.Screen name="CreateTodoScreen" component={CreateTodoScreen} />

          <stack.Screen name="LifeStyleOnboardingScreen" component={LifeStyleOnboardingScreen} />
          <stack.Screen name="BasicLifeStyleScreen" component={BasicLifeStyleScreen} />
          <stack.Screen name="EssentialLifeStyleScreen" component={EssentialLifeStyleScreen} />
          <stack.Screen name="AdditionalLifeStyleScreen" component={AdditionalLifeStyleScreen} />
          <stack.Screen name="LifeStyleEditScreen" component={LifeStyleEditScreen} />

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
          <stack.Screen name="MyInfoScreen" component={MyInfoScreen} />

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
          <rootStack.Screen name="ChipSelectScreen" component={ChipSelectScreen} />
          <rootStack.Screen name="CompleteScreen" component={CompleteScreen} />
        </rootStack.Navigator>
      )}
    </GestureHandlerRootView>
  );
}

export default AppInner;
