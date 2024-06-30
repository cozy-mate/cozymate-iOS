import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SignInScreen: undefined;
  OnBoardScreen: undefined;
  HomeScreen: undefined;
  RoomMainScreen: undefined;
  CreateRoomScreen: undefined;
  TodoListScreen: undefined;

  RoomMateScreen: undefined;
  UserDetailScreen: undefined;
  UserInfoScreen: undefined;
};

// 시작 스크린
export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignInScreen'>;
// 온보딩 스크린
export type OnBoardScreenProps = NativeStackScreenProps<RootStackParamList, 'OnBoardScreen'>;
// 홈 스크린 (방 만들기 Or 초대코드 입력하기)
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
// 방 메인 스크린 (코지봇 알림)
export type RoomMainScreenProps = NativeStackScreenProps<RootStackParamList, 'RoomMainScreen'>;
// 방장 방 만들기 스크린 (방 이름 & 인원 선택)
export type CreateRoomScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateRoomScreen'>;
// 투두리스트 스크린
export type TodoListScreenProps = NativeStackScreenProps<RootStackParamList, 'TodoListScreen'>;

export type RoomMateScreenProps = NativeStackScreenProps<RootStackParamList, 'RoomMateScreen'>;
export type UserDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'UserDetailScreen'>;
export type UserInfoScreenProps = NativeStackScreenProps<RootStackParamList, 'UserInfoScreen'>;
