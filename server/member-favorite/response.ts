import { MemberData } from '@/type/member';

export interface DeleteMemberLikeResponse {
  result: string;
}

export interface GetMemberLikeListResponse {
  result: {
    page: number;
    hasNext: boolean;
    result: {
      memberFavoriteId: number;
      memberStatPreferenceDetail: {
        memberDetail: MemberData;
        equality: number | null;
        preferenceStats: {
          stat: string;
          value: string | number;
          color: string;
        }[];
      };
    }[];
  };
}

export interface CreateMemberLikeResponse {
  result: string;
}
