export interface ReissueTokenResponse {
  result: {
    message: string;
    accessToken: string;
    refreshToken: string;
  };
}
