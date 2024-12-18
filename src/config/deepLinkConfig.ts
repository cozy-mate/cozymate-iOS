import { Linking } from 'react-native';

export const linking = {
  prefixes: ['cozymate://'],
  config: {
    screens: {
      MainScreen: {
        path: 'main',
        screens: {
          CozyHomeScreen: 'home',
          RoomMainScreen: 'roomMain',
          RoleNRuleScreen: 'role',
          MyPageScreen: 'mypage',
        },
      },
      RoomDetailScreen: 'room/:roomId',
      RecommendRoomScreen: 'recommendRoom',
      RoomSearchScreen: 'roomSearch',
      CreateRoleNRuleScreen: 'createRoleNRule/:type',
      EditRoleNRuleScreen: 'editRoleNRule/:type/:id',
      LifeStyleOnboardingScreen: 'lifestyleOnboarding',
      BasicLifeStyleScreen: 'basicLifestyle',
      EssentialLifeStyleScreen: 'essentialLifestyle',
      AdditionalLifeStyleScreen: 'additionalLifestyle',
      SchoolAuthenticationScreen: 'schoolAuthentication/:verified',
      LifeStyleEditScreen: 'lifestyleEdit',
      CreateRoomScreen: 'createRoom/:type',
      SelectCharacterScreen: 'selectCharacter/:type',
      CompleteCreateRoomScreen: 'completeCreateRoom/:type',
      EditRoomScreen: 'editRoom/:id/:type',
      JoinRoomScreen: 'joinRoom',
      RoomMateScreen: 'roomMate',
      UserDetailScreen: 'userDetail/:memberId',
      MyInfoScreen: 'myInfo',
      BasicInfoUpdateScreen: 'basicInfoUpdate/:type',
      FavoriteUserRoomScreen: 'favoriteUserRoom/:type',
      InquiryScreen: 'inquiry/:hasInquiry',
      WithdrawScreen: 'withdraw',
      ChatScreen: 'chat',
      ChatRoomScreen: 'chatRoom/:chatRoomId',
      SendChatScreen: 'sendChat/:memberId/:chatRoomId',
      NotificationScreen: 'notification',
    },
  },
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url != null) return url;
  },
};