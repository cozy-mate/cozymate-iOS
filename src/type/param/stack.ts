import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type StackParamList = {
  MainScreen: { screen: keyof TabNavigatorParamList } | undefined;

  // 방이 없는 경우의 코지홈 스크린
  CozyHomeScreen: undefined;

  // 방이 있는 경우의 코지홈 스크린
  RoomMainScreen: undefined;

  // 롤앤룰 스크린
  TodoListScreen: undefined;
  CreateTodoScreen: { type: 'todo' | 'role' | 'rule' };

  // 라이프 스타일 입력 스크린
  LifeStyleOnboardingScreen: undefined;
  BasicLifeStyleScreen: undefined;
  EssentialLifeStyleScreen: undefined;
  AdditionalLifeStyleScreen: undefined;

  // 방 생성 스크린
  CreateRoomScreen: undefined;
  SelectCharacterScreen: undefined;
  CompleteCreateRoomScreen: undefined;

  // 방 입장 스크린
  JoinRoomScreen: undefined;

  // 방 입장 대기 스크린
  WaitingRoomScreen: undefined;

  // 학교 인증 스크린
  SchoolAuthenticationScreen: undefined;

  // 룸메이트 스크린
  RoomMateScreen: undefined;
  UserDetailScreen: undefined;

  // 피드 스크린
  FeedMainScreen: undefined;
  FeedEditScreen: { mode: 'create' | 'edit' };
  FeedCreateScreen: { mode: 'create' | 'edit'; postId?: number };
  FeedViewScreen: { postId: number };

  // 마이페이지 스크린
  MyPageScreen: undefined;

  // 쪽지 스크린
  ChatScreen: undefined;
  ChatRoomScreen: { chatRoomId: number };
  SendChatScreen: { recipientId: number };

  // 알림 스크린
  NotificationScreen: undefined;
};

export type TabNavigatorParamList = {
  CozyHomeScreen: undefined;
  RoomMainScreen: undefined;
  TodoListScreen: undefined;
  FeedMainScreen: undefined;
  RoomMateScreen: undefined;
  LifeStyleOnboardingScreen: undefined;
  MyPageScreen: undefined;
};

// 방이 없는 경우의 코지홈 스크린
export type CozyHomeScreenProps = NativeStackScreenProps<StackParamList, 'CozyHomeScreen'>;

// 방이 있는 경우의 코지홈 스크린
export type RoomMainScreenProps = NativeStackScreenProps<StackParamList, 'RoomMainScreen'>;

// 롤앤룰 스크린
export type TodoListScreenProps = NativeStackScreenProps<StackParamList, 'TodoListScreen'>;
export type CreateTodoScreenProps = NativeStackScreenProps<StackParamList, 'CreateTodoScreen'>;

// 라이프 스타일 입력 스크린
export type LifeStyleOnboardingScreenProps = NativeStackScreenProps<
  StackParamList,
  'LifeStyleOnboardingScreen'
>;
export type BasicLifeStyleScreenProps = NativeStackScreenProps<
  StackParamList,
  'BasicLifeStyleScreen'
>;
export type EssentialLifeStyleScreenProps = NativeStackScreenProps<
  StackParamList,
  'EssentialLifeStyleScreen'
>;
export type AdditionalLifeStyleScreenProps = NativeStackScreenProps<
  StackParamList,
  'AdditionalLifeStyleScreen'
>;

// 방 생성 스크린
export type CreateRoomScreenProps = NativeStackScreenProps<StackParamList, 'CreateRoomScreen'>;
export type SelectCharacterScreenProps = NativeStackScreenProps<
  StackParamList,
  'SelectCharacterScreen'
>;
export type CompleteCreateRoomScreenProps = NativeStackScreenProps<
  StackParamList,
  'CompleteCreateRoomScreen'
>;

// 방 입장 스크린
export type JoinRoomScreenProps = NativeStackScreenProps<StackParamList, 'JoinRoomScreen'>;

// 방 입장 대기 스크린
export type WaitingRoomScreenProps = NativeStackScreenProps<StackParamList, 'WaitingRoomScreen'>;

// 학교 인증 스크린
export type SchoolAuthenticationScreenProps = NativeStackScreenProps<
  StackParamList,
  'SchoolAuthenticationScreen'
>;

// 룸메이트 스크린
export type RoomMateScreenProps = NativeStackScreenProps<StackParamList, 'RoomMateScreen'>;
export type UserDetailScreenProps = NativeStackScreenProps<StackParamList, 'UserDetailScreen'>;

// 피드 스크린
export type FeedMainScreenProps = NativeStackScreenProps<StackParamList, 'FeedMainScreen'>;
export type FeedEditScreenProps = NativeStackScreenProps<StackParamList, 'FeedEditScreen'>;
export type FeedCreateScreenProps = NativeStackScreenProps<StackParamList, 'FeedCreateScreen'>;
export type FeedViewScreenProps = NativeStackScreenProps<StackParamList, 'FeedViewScreen'>;

// 마이페이지 스크린
export type MyPageScreenProps = NativeStackScreenProps<StackParamList, 'MyPageScreen'>;

// 쪽지 스크린
export type ChatScreenProps = NativeStackScreenProps<StackParamList, 'ChatScreen'>;
export type ChatRoomScreenProps = NativeStackScreenProps<StackParamList, 'ChatRoomScreen'>;
export type SendChatScreenProps = NativeStackScreenProps<StackParamList, 'SendChatScreen'>;

// 알림 스크린
export type NotificationScreenProps = NativeStackScreenProps<StackParamList, 'NotificationScreen'>;
