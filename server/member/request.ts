export interface WithdrawRequest {
  withdrawReason: string;
}

export interface UpdateMemberInfoRequest {
  nickname: string;
  majorName: string;
  birthday: string;
  persona: number;
}

export interface SignUpRequest {
  nickname: string;
  gender: string;
  birthday: string;
  persona: number;
  memberStatPreferenceDto: {
    preferenceList: string[];
  };
}
