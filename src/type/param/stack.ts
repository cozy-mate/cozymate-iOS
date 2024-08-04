import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SignInScreen: undefined;

  PersonalInfoInputScreen: undefined;
  CharacterInputScreen: undefined;
  CompleteScreen: undefined;

  CozyHomeScreen: undefined;
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
  UserInfoScreen: undefined;
};

export type TabNavigatorParamList = {
  CozyHomeScreen: undefined;
  TodoListScreen: undefined;
  FeedScreen: undefined;
  RoomMateScreen: undefined;
  MyPageScreen: undefined;
};

// 시작 스크린
export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignInScreen'>;

export type PersonalInfoInputScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PersonalInfoInputScreen'
>;

export type CharacterInputScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CharacterInputScreen'
>;

export type CompleteScreenProps = NativeStackScreenProps<RootStackParamList, 'CompleteScreen'>;

// 홈 스크린 (방 만들기 Or 초대코드 입력하기)
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'CozyHomeScreen'>;

export type SchoolAuthenticationScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SchoolAuthenticationScreen'
>;

export type LifeStyleOnboardingScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LifeStyleOnboardingScreen'
>;

export type LifeStyleInputScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LifeStyleInputScreen'
>;

export type BasicLifeStyleScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'BasicLifeStyleScreen'
>;

export type EssentialLifeStyleScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EssentialLifeStyleScreen'
>;

// 방 메인 스크린 (코지봇 알림)
export type RoomMainScreenProps = NativeStackScreenProps<RootStackParamList, 'RoomMainScreen'>;
// 방장 방 만들기 스크린 (방 이름 & 인원 선택)
export type CreateRoomScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateRoomScreen'>;
// 투두리스트 스크린
export type TodoListScreenProps = NativeStackScreenProps<RootStackParamList, 'TodoListScreen'>;

export type RoomMateScreenProps = NativeStackScreenProps<RootStackParamList, 'RoomMateScreen'>;
export type UserDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'UserDetailScreen'>;
export type UserInfoScreenProps = NativeStackScreenProps<RootStackParamList, 'UserInfoScreen'>;
