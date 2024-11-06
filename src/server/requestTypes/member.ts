export interface SignUpRequest {
  nickname: string;
  gender: string;
  birthday: string;
  persona: number;
  universityId: number;
}

export interface SignInRequest {
  clientId: string;
  socialType: string;
}

export interface TestSignUpRequest {
  nickname: string;
  gender: string;
  birthday: string;
  persona: number;
  universityId: number;
}
