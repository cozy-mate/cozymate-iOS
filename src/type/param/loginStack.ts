import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type LoginStackParamList = {
  MainScreen: { screen: keyof TabNavigatorParamList } | undefined;
  CozyHomeScreen: undefined;
  SelectCharacterScreen: undefined;
  CompleteCreateRoomScreen: undefined;

  RoomMainScreen: undefined;
  CreateRoomScreen: undefined;
  TodoListScreen: undefined;
  SchoolAuthenticationScreen: undefined;
  LifeStyleOnboardingScreen: undefined;

  JoinRoomScreen: undefined;

  WaitingRoomScreen: undefined;

  BasicLifeStyleScreen: undefined;
  EssentialLifeStyleScreen: undefined;
  AdditionalLifeStyleScreen: undefined;

  LifeStyleInputScreen: undefined;

  RoomMateScreen: undefined;
  UserDetailScreen: undefined;

  FeedMainScreen: undefined;
  FeedEditScreen: { mode: 'create' | 'edit' };
  FeedCreateScreen: { mode: 'create' | 'edit'; postId?: number };
  FeedViewScreen: { postId: number };

  MyPageScreen: undefined;
};

export type TabNavigatorParamList = {
  CozyHomeScreen: undefined;
  TodoListScreen: undefined;
  FeedMainScreen: undefined;
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

// 방 참여하기 스크린
export type JoinRoomScreenProps = NativeStackScreenProps<LoginStackParamList, 'JoinRoomScreen'>;

// 룸메이트 대기 스크린
export type WaitingRoomScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'WaitingRoomScreen'
>;

// 학교 인증 스크린
export type SchoolAuthenticationScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'SchoolAuthenticationScreen'
>;

// 라이프 스타일 입력 스크린 - 온보딩
export type LifeStyleOnboardingScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'LifeStyleOnboardingScreen'
>;

// 라이프 스타일 입력 스크린 - 기본정보
export type BasicLifeStyleScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'BasicLifeStyleScreen'
>;

// 라이프 스타일 입력 스크린 - 필수정보
export type EssentialLifeStyleScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'EssentialLifeStyleScreen'
>;

// 라이프 스타일 입력 스크린 - 선택정보
export type AdditionalLifeStyleScreenProps = NativeStackScreenProps<
  LoginStackParamList,
  'AdditionalLifeStyleScreen'
>;

// 방 메인 스크린 (코지봇 알림)
export type RoomMainScreenProps = NativeStackScreenProps<LoginStackParamList, 'RoomMainScreen'>;

// 투두리스트 스크린
export type TodoListScreenProps = NativeStackScreenProps<LoginStackParamList, 'TodoListScreen'>;

export type RoomMateScreenProps = NativeStackScreenProps<LoginStackParamList, 'RoomMateScreen'>;
export type UserDetailScreenProps = NativeStackScreenProps<LoginStackParamList, 'UserDetailScreen'>;

// 피드 스크린
export type FeedMainScreenProps = NativeStackScreenProps<LoginStackParamList, 'FeedMainScreen'>;
export type FeedEditScreenProps = NativeStackScreenProps<LoginStackParamList, 'FeedEditScreen'>;
export type FeedCreateScreenProps = NativeStackScreenProps<LoginStackParamList, 'FeedCreateScreen'>;
export type FeedViewScreenProps = NativeStackScreenProps<LoginStackParamList, 'FeedViewScreen'>;

// 마이페이지 스크린
export type MyPageScreenProps = NativeStackScreenProps<LoginStackParamList, 'MyPageScreen'>;
