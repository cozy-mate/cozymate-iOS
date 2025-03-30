export interface VerifyMailResponse {
  result: {
    tokenResponseDTO: {
      message: string;
      accessToken: string;
      refreshToken: string;
    };
  };
}
