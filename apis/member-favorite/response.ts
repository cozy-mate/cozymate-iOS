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
        memberDetail: {
          memberId: number;
          nickname: string;
          gender: string;
          birthday: string;
          universityName: string;
          universityId: number;
          majorName: string;
          persona: number;
        };
        equality: number | null;
        preferenceStats: {
          stat: string;
          value: string | number | string[];
          color: string;
        }[];
      };
    }[];
  };
}

export interface CreateMemberLikeResponse {
  result: string;
}
