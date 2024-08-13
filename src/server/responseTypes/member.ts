export interface DeleteMemberResponse {
  result: string;
}

export interface ReissueTokenResponse {
  result: {
    message: string;
    accessToken: string;
    refreshToken: string;
    memberInfoDTO: {
      name: string;
      nickname: string;
      gender: string;
      birthday: string;
      persona: number;
    };
  };
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
    message: string;
    accessToken: string;
    refreshToken: string;
    memberInfoDTO: {
      name: string;
      nickname: string;
      gender: string;
      birthday: string;
      persona: number;
    };
  };
}
