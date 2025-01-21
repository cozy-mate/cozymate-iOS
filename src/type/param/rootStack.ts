import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  SignInScreen: undefined;
  PersonalInfoInputScreen: undefined;
  UniversityInputScreen: undefined;
  CharacterInputScreen: undefined;
  ChipSelectScreen: undefined;
  CompleteScreen: undefined;

  BasicLifeStyleScreen: undefined;
  EssentialLifyStyleScreen: undefined;
  AdditionalLifeStyleScreen: undefined;
};

// 시작 스크린
export type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignInScreen'>;

// 온보딩 1 스크린
export type PersonalInfoInputScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PersonalInfoInputScreen'
>;

export type UniversityInputScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'UniversityInputScreen'
>;

// 온보딩 2 스크린
export type CharacterInputScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CharacterInputScreen'
>;

// 온보딩 3 스크린
export type ChipSelectScreenProps = NativeStackScreenProps<RootStackParamList, 'ChipSelectScreen'>;

// 온보딩 완료 스크린
export type CompleteScreenProps = NativeStackScreenProps<RootStackParamList, 'CompleteScreen'>;

export type BasicLifeStyleScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'BasicLifeStyleScreen'
>;

export type EssentialLifyStyleScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EssentialLifyStyleScreen'
>;

export type AdditionalLifyStyleScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AdditionalLifeStyleScreen'
>;
