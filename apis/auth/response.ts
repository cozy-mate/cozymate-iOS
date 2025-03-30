export interface ReissueTokenResponse {
  result: {
    message: string;
    accessToken: string;
    refreshToken: string;
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
