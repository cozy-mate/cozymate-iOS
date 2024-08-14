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
