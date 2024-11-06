export interface VerifyMailResponse {
  result: {
    message: string;
    accessToken: string;
    refreshToken: string;
  };
}
