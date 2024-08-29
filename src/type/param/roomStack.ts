import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RoomStackParamList = {
  MainScreen: { screen: keyof HasRoomTabNavigatorParamList } | undefined;
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

  CreateTodoScreen: { type: 'todo' | 'role' | 'rule' };

  RoomMateScreen: undefined;
  UserDetailScreen: undefined;

  FeedMainScreen: undefined;
  FeedEditScreen: { mode: 'create' | 'edit' };
  FeedCreateScreen: { mode: 'create' | 'edit'; postId?: number };
  FeedViewScreen: { postId: number };

  MyPageScreen: undefined;

  ChatScreen: undefined;

  NotificationScreen: undefined;
};

export type HasRoomTabNavigatorParamList = {
  RoomMainScreen: undefined;
  TodoListScreen: undefined;
  FeedMainScreen: undefined;
  RoomMateScreen: undefined;
  MyPageScreen: undefined;
};

// 학교 인증 스크린
export type SchoolAuthenticationScreenProps = NativeStackScreenProps<
  RoomStackParamList,
  'SchoolAuthenticationScreen'
>;

// 라이프 스타일 입력 스크린 - 온보딩
export type LifeStyleOnboardingScreenProps = NativeStackScreenProps<
  RoomStackParamList,
  'LifeStyleOnboardingScreen'
>;

// 라이프 스타일 입력 스크린 - 기본정보
export type BasicLifeStyleScreenProps = NativeStackScreenProps<
  RoomStackParamList,
  'BasicLifeStyleScreen'
>;

// 라이프 스타일 입력 스크린 - 필수정보
export type EssentialLifeStyleScreenProps = NativeStackScreenProps<
  RoomStackParamList,
  'EssentialLifeStyleScreen'
>;

// 라이프 스타일 입력 스크린 - 선택정보
export type AdditionalLifeStyleScreenProps = NativeStackScreenProps<
  RoomStackParamList,
  'AdditionalLifeStyleScreen'
>;

// 방 메인 스크린 (코지봇 알림)
export type RoomMainScreenProps = NativeStackScreenProps<RoomStackParamList, 'RoomMainScreen'>;

// 투두리스트 스크린
export type TodoListScreenProps = NativeStackScreenProps<RoomStackParamList, 'TodoListScreen'>;
export type CreateTodoScreenProps = NativeStackScreenProps<RoomStackParamList, 'CreateTodoScreen'>;
export type RoomMateScreenProps = NativeStackScreenProps<RoomStackParamList, 'RoomMateScreen'>;
export type UserDetailScreenProps = NativeStackScreenProps<RoomStackParamList, 'UserDetailScreen'>;

// 피드 스크린
export type FeedMainScreenProps = NativeStackScreenProps<RoomStackParamList, 'FeedMainScreen'>;
export type FeedEditScreenProps = NativeStackScreenProps<RoomStackParamList, 'FeedEditScreen'>;
export type FeedCreateScreenProps = NativeStackScreenProps<RoomStackParamList, 'FeedCreateScreen'>;
export type FeedViewScreenProps = NativeStackScreenProps<RoomStackParamList, 'FeedViewScreen'>;

// 마이페이지 스크린
export type MyPageScreenProps = NativeStackScreenProps<RoomStackParamList, 'MyPageScreen'>;

// 쪽지 스크린
export type ChatScreenProps = NativeStackScreenProps<RoomStackParamList, 'ChatScreen'>;

// 알림 스크린
export type NotificationScreenProps = NativeStackScreenProps<
  RoomStackParamList,
  'NotificationScreen'
>;
