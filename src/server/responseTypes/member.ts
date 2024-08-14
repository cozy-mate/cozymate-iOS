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
