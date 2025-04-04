export interface ReissueTokenResponse {
  result: {
    tokenResponseDTO: {
      message: string;
      accessToken: string;
      refreshToken: string;
    };
    memberDetailResponseDTO: {
      memberId: number;
      nickname: string;
      gender: string;
      birthday: string;
      universityName: string;
      universityId: number;
      majorName: string;
      persona: number;
    };
  };
}

export interface SocialLoginResponse {
  result: {
    tokenResponseDTO: {
      message: string;
      accessToken: string;
      refreshToken: string;
    };
    memberDetailResponseDTO: {
      memberId: number;
      nickname: string;
      gender: string;
      birthday: string;
      universityName: string;
      universityId: number;
      majorName: string;
      persona: number;
    };
  };
}
