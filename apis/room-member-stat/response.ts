export interface GetRoomMemberStatsResponse {
  result: {
    memberList: {
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
      memberStat: Record<string, string>;
    }[];
    color: string;
  };
}
