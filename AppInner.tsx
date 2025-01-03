import React, { useState } from 'react';
import LottieView from 'lottie-react-native';
import Animated from 'react-native-reanimated';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from 'src/screens/main';
import ChatScreen from 'src/screens/chatting/chat';
import MyPageScreen from 'src/screens/myPage/myPage';
import SignInScreen from 'src/screens/signIn/signIn';
import MyInfoScreen from 'src/screens/myPage/myInfo';
import InquiryScreen from 'src/screens/myPage/inquiry';
import WithdrawScreen from 'src/screens/myPage/withdraw';
import CompleteScreen from 'src/screens/onBoard/complete';
import CozyHomeScreen from 'src/screens/cozyHome/cozyHome';
import RoomMainScreen from 'src/screens/roomMain/roomMain';
import JoinRoomScreen from 'src/screens/joinRoom/joinRoom';
import RoomMateScreen from 'src/screens/roomMate/roomMate';
import ChatRoomScreen from 'src/screens/chatting/chatRoom';
import SendChatScreen from 'src/screens/chatting/sendChat';
import EditRoomScreen from 'src/screens/editRoom/editRoom';
import RoomSearchScreen from 'src/screens/search/roomSearch';
import UserSearchScreen from 'src/screens/search/userSearch';
import ChipSelectScreen from 'src/screens/onBoard/chipSelect';
import RoleNRuleScreen from 'src/screens/roleNrule/roleNrule';
import CreateRoomScreen from 'src/screens/createRoom/createRoom';
import UserDetailScreen from 'src/screens/userDetail/userDetail';
import CharacterInputScreen from 'src/screens/onBoard/character';
import RoomDetailScreen from 'src/screens/roomDetail/roomDetail';
import LifeStyleEditScreen from 'src/screens/myPage/lifeStyleEdit';
import NotificationScreen from 'src/screens/notification/notification';
import PersonalInfoInputScreen from 'src/screens/onBoard/personalInfo';
import BasicInfoUpdateScreen from 'src/screens/myPage/basicInfoUpdate';
import EditRoleNRuleScreen from 'src/screens/roleNrule/editRoleAndRule';
import LifeStyleOnboardingScreen from 'src/screens/lifeStyle/onBoarding';
import FavoriteUserRoomScreen from 'src/screens/myPage/favoriteUserRoom';
import BasicLifeStyleScreen from 'src/screens/lifeStyle/basicInformation';
import RecommendRoomScreen from 'src/screens/recommendRoom/recommendRoom';
import CreateRoleNRuleScreen from 'src/screens/roleNrule/createRoleNRule';
import SelectCharacterScreen from 'src/screens/createRoom/selectCharacter';
import CompleteCreateRoomScreen from 'src/screens/createRoom/completeCreate';
import EssentialLifeStyleScreen from 'src/screens/lifeStyle/essentialInformation';
import AdditionalLifeStyleScreen from 'src/screens/lifeStyle/additionalInformation';
import SchoolAuthenticationScreen from 'src/screens/schoolAuthentication/schoolAuthentication';

import { useLoggedInStore } from '@zustand/member/member';

import { useFcmMessage } from '@hooks/fcm';
import { useAutoLogin } from '@hooks/autoLogin';
import { useNotifee, useDeleteAllNotifee } from '@hooks/notifee';

import { StackParamList } from '@type/param/stack';
import { RootStackParamList } from '@type/param/rootStack';

import { toastConfig } from '@config/toastConfig';

const rootStack = createNativeStackNavigator<RootStackParamList>();
const stack = createNativeStackNavigator<StackParamList>();

function AppInner() {
  const { loggedIn } = useLoggedInStore();
  const [appLoaded, setAppLoaded] = useState<boolean>(false);

  useDeleteAllNotifee();
  useAutoLogin(setAppLoaded);
  useFcmMessage();
  useNotifee(appLoaded);

  if (!appLoaded) {
    return (
      <Animated.View className="flex-1">
        <LottieView
          source={require('./src/assets/splash.json')}
          style={{ flex: 1 }}
          autoPlay={true}
          loop={false}
        />
      </Animated.View>
    );
  }

  return (
    <GestureHandlerRootView>
      {loggedIn ? (
        <stack.Navigator initialRouteName="MainScreen" screenOptions={{ headerShown: false }}>
          <stack.Screen name="MainScreen" component={MainScreen} />

          <stack.Screen name="CozyHomeScreen" component={CozyHomeScreen} />

          <stack.Screen name="RoomMainScreen" component={RoomMainScreen} />
          <stack.Screen name="RoomDetailScreen" component={RoomDetailScreen} />
          <stack.Screen name="RecommendRoomScreen" component={RecommendRoomScreen} />
          <stack.Screen name="RoomSearchScreen" component={RoomSearchScreen} />

          <stack.Screen name="RoleNRuleScreen" component={RoleNRuleScreen} />
          <stack.Screen name="CreateRoleNRuleScreen" component={CreateRoleNRuleScreen} />
          <stack.Screen name="EditRoleNRuleScreen" component={EditRoleNRuleScreen} />

          <stack.Screen name="LifeStyleOnboardingScreen" component={LifeStyleOnboardingScreen} />
          <stack.Screen name="BasicLifeStyleScreen" component={BasicLifeStyleScreen} />
          <stack.Screen name="EssentialLifeStyleScreen" component={EssentialLifeStyleScreen} />
          <stack.Screen name="AdditionalLifeStyleScreen" component={AdditionalLifeStyleScreen} />
          <stack.Screen name="LifeStyleEditScreen" component={LifeStyleEditScreen} />

          <stack.Screen name="CreateRoomScreen" component={CreateRoomScreen} />
          <stack.Screen name="SelectCharacterScreen" component={SelectCharacterScreen} />
          <stack.Screen name="CompleteCreateRoomScreen" component={CompleteCreateRoomScreen} />

          <stack.Screen name="EditRoomScreen" component={EditRoomScreen} />

          <stack.Screen name="JoinRoomScreen" component={JoinRoomScreen} />

          <stack.Screen name="SchoolAuthenticationScreen" component={SchoolAuthenticationScreen} />

          <stack.Screen name="RoomMateScreen" component={RoomMateScreen} />
          <stack.Screen name="UserSearchScreen" component={UserSearchScreen} />
          <stack.Screen name="UserDetailScreen" component={UserDetailScreen} />

          {/* <stack.Screen name="FeedMainScreen" component={FeedMainScreen} />
          <stack.Screen name="FeedEditScreen" component={FeedEditScreen} />
          <stack.Screen name="FeedViewScreen" component={FeedViewScreen} />
          <stack.Screen name="FeedCreateScreen" component={FeedCreateScreen} /> */}

          <stack.Screen name="MyPageScreen" component={MyPageScreen} />
          <stack.Screen name="MyInfoScreen" component={MyInfoScreen} />
          <stack.Screen name="BasicInfoUpdateScreen" component={BasicInfoUpdateScreen} />
          <stack.Screen name="FavoriteUserRoomScreen" component={FavoriteUserRoomScreen} />
          <stack.Screen name="InquiryScreen" component={InquiryScreen} />
          <stack.Screen name="WithdrawScreen" component={WithdrawScreen} />

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
      <Toast config={toastConfig} />
    </GestureHandlerRootView>
  );
}

export default AppInner;
