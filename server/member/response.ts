import { MemberData } from '@/type/member';
import { Tokens } from '@/type/token';

export interface WithdrawResponse {
  result: string;
}

export interface GetMemberUniversityInfoResponse {
  result: {
    universityName: string;
    mailAddress: string;
    majorName: string;
  };
}

export interface GetMemberProfileResponse {
  result: MemberData;
}

export interface CheckNicknameResponse {
  result: boolean;
}

export interface UpdateMemberInfoResponse {
  result: boolean;
}

export interface SignUpResponse {
  result: {
    tokenResponseDTO: Tokens;
    memberDetailResponseDTO: MemberData;
  };
}
