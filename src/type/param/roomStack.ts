import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RoomStackParamList = {
  MainScreen: { screen: keyof HasRoomTabNavigatorParamList } | undefined;
  //   CozyHomeScreen: undefined;
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

  CreateTodoScreen: undefined;

  RoomMateScreen: undefined;
  UserDetailScreen: undefined;

  FeedMainScreen: undefined;
  FeedEditScreen: { mode: 'create' | 'edit' };
  FeedCreateScreen: { mode: 'create' | 'edit'; postId?: number };
  FeedViewScreen: { postId: number };

  MyPageScreen: undefined;
};

export type HasRoomTabNavigatorParamList = {
  RoomMainScreen: undefined;
  TodoListScreen: undefined;
  FeedMainScreen: undefined;
  RoomMateScreen: undefined;
  MyPageScreen: undefined;
};

// // 코지홈 스크린
// export type HomeScreenProps = NativeStackScreenProps<RoomStackParamList, 'CozyHomeScreen'>;

// // 방 만들기 스크린 - 방 이름 & 인원 선택
// export type CreateRoomScreenProps = NativeStackScreenProps<RoomStackParamList, 'CreateRoomScreen'>;

// // 방 만들기 스크린 - 캐릭터 선택
// export type SelectCharacterScreenProps = NativeStackScreenProps<
//   RoomStackParamList,
//   'SelectCharacterScreen'
// >;

// // 방 만들기 스크린 - 방 생성 완료
// export type CompleteCreateRoomScreenProps = NativeStackScreenProps<
//   RoomStackParamList,
//   'CompleteCreateRoomScreen'
// >;

// // 방 참여하기 스크린
// export type JoinRoomScreenProps = NativeStackScreenProps<RoomStackParamList, 'JoinRoomScreen'>;

// // 룸메이트 대기 스크린
// export type WaitingRoomScreenProps = NativeStackScreenProps<
//   RoomStackParamList,
//   'WaitingRoomScreen'
// >;

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
