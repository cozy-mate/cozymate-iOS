export interface SignUpRequest {
  name: string;
  nickname: string;
  gender: string;
  birthday: string;
  persona: number;
}

export interface SignInRequest {
  clientId: string;
  socialType: string;
}
