import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feed } from '../../layout/bottomNavBar';
import FeedCreateScreen from 'src/screens/feed/feedCreate';
import FeedViewScreen from 'src/screens/feed/feedView';

export type LoginStackParamList = {
  MainScreen: undefined;
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

  FeedMainScreen: undefined;
  FeedEditScreen: undefined;
  FeedCreateScreen: undefined;
  FeedViewScreen: {postId : number};
};

export type TabNavigatorParamList = {
  LifeStyleOnboardingScreen: undefined;
  CozyHomeScreen: undefined;
  TodoListScreen: undefined;
  FeedMainScreen: undefined;
  RoomMateScreen: undefined;
  MyPageScreen: undefined;
};

// 홈 스크린 (방 만들기 Or 초대코드 입력하기)
export type HomeScreenProps = NativeStackScreenProps<LoginStackParamList, 'CozyHomeScreen'>;

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
// 방장 방 만들기 스크린 (방 이름 & 인원 선택)
export type CreateRoomScreenProps = NativeStackScreenProps<LoginStackParamList, 'CreateRoomScreen'>;
// 투두리스트 스크린
export type TodoListScreenProps = NativeStackScreenProps<LoginStackParamList, 'TodoListScreen'>;

export type RoomMateScreenProps = NativeStackScreenProps<LoginStackParamList, 'RoomMateScreen'>;
export type UserDetailScreenProps = NativeStackScreenProps<LoginStackParamList, 'UserDetailScreen'>;

// 피드 스크린
export type FeedMainScreenProps = NativeStackScreenProps<LoginStackParamList, 'FeedMainScreen'>;
export type FeedEditScreenProps = NativeStackScreenProps<LoginStackParamList, 'FeedEditScreen'>;
export type FeedCreateScreenProps = NativeStackScreenProps<LoginStackParamList, 'FeedCreateScreen'>;
export type FeedViewScreenProps = NativeStackScreenProps<LoginStackParamList, 'FeedViewScreen'>;
