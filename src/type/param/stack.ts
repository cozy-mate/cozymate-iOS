import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type SignInParamList = {
  SignInScreen: undefined;
  OnBoardScreen: undefined;
};

export type OnBoardParamList = {
  SignInScreen: undefined;
  OnBoardScreen: undefined;
};

export type SignInScreenProps = NativeStackScreenProps<SignInParamList, 'SignInScreen'>;
export type OnBoardScreenProps = NativeStackScreenProps<OnBoardParamList, 'OnBoardScreen'>;
