export interface WithdrawResponse {
  result: string;
}

export interface GetMemberProfileResponse {
  result: {
    memberId: number;
    nickname: string;
    gender: string;
    birthday: string;
    universityName: string;
    universityId: number;
    majorName: string;
    persona: number;
  };
}

export interface CheckNicknameResponse {
  result: boolean;
}

export interface UpdateMemberInfoResponse {
  result: boolean;
}

export interface SignUpResponse {
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
