export type MemberDetail = {
  memberId: number;
  nickname: string;
  gender: string;
  birthday: string;
  universityName: string;
  universityId: number;
  majorName: string;
  persona: number;
};

export type MemberItem = {
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
    value: string | number;
    color: string;
  }[];
};
