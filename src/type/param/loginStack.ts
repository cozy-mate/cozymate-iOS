import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type LoginStackParamList = {
  MainScreen: undefined;
  CozyHomeScreen: undefined;
  SelectCharacterScreen: undefined;
  CompleteCreateRoomScreen: undefined;

  RoomMainScreen: undefined;
  CreateRoomScreen: undefined;
  TodoListScreen: undefined;
  SchoolAuthenticationScreen: undefined;
  LifeStyleOnboardingScreen: undefined;

  BasicLifeStyleScreen: undefined;
  EssentialLifeStyleScreen: undefined;

  LifeStyleInputScreen: undefined;

  BottomNavBar: undefined;

  RoomMateScreen: undefined;
  UserDetailScreen: undefined;
};

export type TabNavigatorParamList = {
  LifeStyleOnboardingScreen: undefined;
  CozyHomeScreen: undefined;
  TodoListScreen: undefined;
  FeedScreen: undefined;
  RoomMateScreen: undefined;
  MyPageScreen: undefined;
};

// 코지홈 스크린
export type HomeScreenProps = NativeStackScreenProps<LoginStackParamList, 'CozyHomeScreen'>;

// 방 만들기 스크린 - 방 이름 & 인원 선택
export type CreateRoomScreenProps = NativeStackScreenProps<LoginStackParamList, 'CreateRoomScreen'>;

// 방 만들기 스크린 - 캐릭터 선택
export type SelectCharacterScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'SelectCharacterScreen'
>;

// 방 만들기 스크린 - 방 생성 완료
export type CompleteCreateRoomScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'CompleteCreateRoomScreen'
>;

export type SchoolAuthenticationScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'SchoolAuthenticationScreen'
>;

export type LifeStyleOnboardingScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'LifeStyleOnboardingScreen'
>;

export type LifeStyleInputScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'LifeStyleInputScreen'
>;

export type BasicLifeStyleScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'BasicLifeStyleScreen'
>;

export type EssentialLifeStyleScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'EssentialLifeStyleScreen'
>;

// 방 메인 스크린 (코지봇 알림)
export type RoomMainScreenProps = NativeStackScreenProps<LoginStackParamList, 'RoomMainScreen'>;

// 투두리스트 스크린
export type TodoListScreenProps = NativeStackScreenProps<LoginStackParamList, 'TodoListScreen'>;

export type RoomMateScreenProps = NativeStackScreenProps<LoginStackParamList, 'RoomMateScreen'>;
export type UserDetailScreenProps = NativeStackScreenProps<LoginStackParamList, 'UserDetailScreen'>;
