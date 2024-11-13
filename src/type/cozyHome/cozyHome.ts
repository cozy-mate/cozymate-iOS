export interface UserItem {
  memberDetail: {
    memberId: number;
    nickname: string;
    gender: string;
    birthday: string;
    universityName: string;
    majorName: string;
    persona: number;
  };
  equality: number;
  preferenceStats: Record<string, string | number>;
}

export interface RoomItem {
  roomId: number;
  name: string;
  hashtags: string[];
  equality: number;
  numOfArrival: number;
  maxMateNum: number;
  equalMemberStatNum: Record<string, number>;
}
