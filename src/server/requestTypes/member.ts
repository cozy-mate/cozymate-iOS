export interface SignUpRequest {
  nickname: string;
  gender: string;
  birthday: string;
  school: number;
  persona: number;
}

export interface SignInRequest {
  clientId: string;
  socialType: string;
}

export interface TestSignUpRequest {
  name: string;
  nickname: string;
  gender: string;
  birthday: string;
  persona: number;
}
