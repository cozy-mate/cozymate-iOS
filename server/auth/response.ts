import { MemberData } from '@/type/member';
import { Tokens } from '@/type/token';

export interface ReissueTokenResponse {
  result: {
    tokenResponseDTO: Tokens;
    memberDetailResponseDTO: MemberData;
  };
}

export interface SocialLoginResponse {
  result: {
    tokenResponseDTO: Tokens;
    memberDetailResponseDTO: MemberData;
  };
}
