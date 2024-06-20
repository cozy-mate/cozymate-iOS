import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type SignInParamList = {
  SignInScreen: undefined;
  OnBoardScreen: undefined;
  RoomMateScreen: undefined;
  CreateRoomScreen: undefined;
};

export type OnBoardParamList = {
  SignInScreen: undefined;
  OnBoardScreen: undefined;
  RoomMateScreen: undefined;
  CreateRoomScreen: undefined;
};

export type RoomMateParamList = {
  SignInScreen: undefined;
  OnBoardScreen: undefined;
  RoomMateScreen: undefined;
  CreateRoomScreen: undefined;
};

export type CreateRoomParamList = {
  SignInScreen: undefined;
  OnBoardScreen: undefined;
  RoomMateScreen: undefined;
  CreateRoomScreen: undefined;
};

export type SignInScreenProps = NativeStackScreenProps<SignInParamList, 'SignInScreen'>;
export type OnBoardScreenProps = NativeStackScreenProps<OnBoardParamList, 'OnBoardScreen'>;
export type RoomMateScreenProps = NativeStackScreenProps<RoomMateParamList, 'RoomMateScreen'>;
export type CreateRommScreenProps = NativeStackScreenProps<CreateRoomParamList, 'CreateRoomScreen'>;
