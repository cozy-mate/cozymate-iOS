import { Linking } from 'react-native';
import { LinkingOptions } from '@react-navigation/native';
export const linking = {
  prefixes: ['cozymate://'], // 딥 링크 접두어
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
      CozyHomeScreen: 'home', // 홈(메인) 스크린
      RoomMainScreen: 'roomMain', // 방 메인 스크린
      RoomDetailScreen: 'room/:roomId', // 방 상세 스크린
      RecommendRoomScreen: 'recommendRoom', // 방 추천 스크린
      RoomSearchScreen: 'roomSearch', // 방 검색 스크린
      RoleNRuleScreen: 'roleNRule', // 롤앤룰 메인 스크린
      CreateRoleNRuleScreen: 'createRoleNRule/:type', // 롤앤룰 생성 스크린
      EditRoleNRuleScreen: 'editRoleNRule/:type/:id', // 롤앤룰 수정 스크린
      LifeStyleEditScreen: 'lifestyle/edit', // 라이프 스타일 수정 스크린
      CreateRoomScreen: 'createRoom/:type', // 방 생성 스크린
      SelectCharacterScreen: 'selectCharacter/:type', // 캐릭터 선택 스크린
      CompleteCreateRoomScreen: 'completeCreateRoom/:type', // 방 생성 완료 스크린
      EditRoomScreen: 'editRoom/:id/:type', // 방 수정 스크린
      JoinRoomScreen: 'joinRoom', // 방 입장 스크린
      RoomMateScreen: 'roomMate', // 룸메이트 스크린
      UserDetailScreen: 'userDetail/:memberId', // 사용자 상세 스크린
      MyPageScreen: 'mypage', // 마이페이지 스크린
      MyInfoScreen: 'myInfo', // 내 정보 스크린
      BasicInfoUpdateScreen: 'basicInfoUpdate/:type', // 기본 정보 업데이트 스크린
      FavoriteUserRoomScreen: 'favoriteUserRoom/:type', // 좋아요 유저/방 스크린
      InquiryScreen: 'inquiry/:hasInquiry', // 문의 스크린
      WithdrawScreen: 'withdraw', // 탈퇴 스크린
      ChatScreen: 'chat', // 채팅 메인 스크린
      ChatRoomScreen: 'chatRoom/:chatRoomId', // 채팅방 스크린
      SendChatScreen: 'sendChat/:memberId/:chatRoomId', // 쪽지 스크린
      NotificationScreen: 'notification', // 알림 스크린
      UserSearchScreen: 'userSearch', // 사용자 검색 스크린
    },
  },
   async getInitialURL() {
    const url = await Linking.getInitialURL();
    if (url != null) return url;
  },
};
