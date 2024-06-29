import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SignInScreen: undefined;
  HomeScreen: undefined;
  RoomMainScreen: undefined;
  OnBoardScreen: undefined;
  RoomMateScreen: undefined;
  CreateRoomScreen: undefined;
  UserDetailScreen: undefined;
  UserInfoScreen: undefined;
};

export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignInScreen'>;
export type OnBoardScreenProps = NativeStackScreenProps<RootStackParamList, 'OnBoardScreen'>;
export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'HomeScreen'>;
export type RoomMainScreenProps = NativeStackScreenProps<RootStackParamList, 'RoomMainScreen'>;
export type RoomMateScreenProps = NativeStackScreenProps<RootStackParamList, 'RoomMateScreen'>;
export type CreateRoomScreenProps = NativeStackScreenProps<RootStackParamList, 'CreateRoomScreen'>;
export type UserDetailScreenProps = NativeStackScreenProps<RootStackParamList, 'UserDetailScreen'>;
export type UserInfoScreenProps = NativeStackScreenProps<RootStackParamList, 'UserInfoScreen'>;
