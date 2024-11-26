export interface CheckVerifiedResponse {
  result: string;
}

export interface VerifyMailResponse {
  result: {
    message: string;
    accessToken: string;
    refreshToken: string;
  };
}
