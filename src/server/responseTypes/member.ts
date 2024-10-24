import {
  AppleRequestScope,
  AppleRequestResponseFullName,
} from '@invertase/react-native-apple-authentication';

// [카카오 sdk 로그인]
export interface KakaoLoginResponse {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  accessTokenExpiresAt: Date;
  refreshTokenExpiresAt: Date;
  scopes: string[];
}

// [애플 sdk 로그인]
export interface AppleLoginResponse {
  user: string;
  email: string | null;
  authorizedScopes: AppleRequestScope[];
  fullName: AppleRequestResponseFullName | null;
  identityToken: string | null;
  authorizationCode: string | null;
  realUserStatus: number;
  state: string | null;
  nonce: string;
}

export interface DeleteMemberResponse {
  result: string;
}

export interface GetProfileResponse {
  result: {
    name: string;
    nickname: string;
    gender: string;
    birthday: string;
    persona: number;
  };
}

export interface CheckNicknameResponse {
  result: boolean;
}

export interface SignUpResponse {
  result: {
    tokenResponseDTO: {
      message: string;
      accessToken: string;
      refreshToken: string;
    };
    memberInfoDTO: {
      name: string;
      nickname: string;
      gender: string;
      birthday: string;
      persona: number;
    };
  };
}

export interface SignInResponse {
  result: {
    tokenResponseDTO: {
      message: string;
      accessToken: string;
      refreshToken: string;
    };
    memberInfoDTO: {
      name: string;
      nickname: string;
      gender: string;
      birthday: string;
      persona: number;
    };
  };
}

export interface TestSignUpResponse {
  result: {
    tokenResponseDTO: {
      message: string;
      accessToken: string;
      refreshToken: string;
    };
    memberInfoDTO: {
      name: string;
      nickname: string;
      gender: string;
      birthday: string;
      persona: number;
    };
  };
}
