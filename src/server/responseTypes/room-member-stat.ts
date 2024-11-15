export interface GetChipDetailDataResponse {
  result: {
    memberList: {
      memberDetail: {
        memberId: number;
        nickname: string;
        gender: string;
        birthday: string;
        universityName: string;
        majorName: string;
        persona: number;
      };
      memberStat: Record<string, string | number>;
    }[];
    color: string;
  };
}
