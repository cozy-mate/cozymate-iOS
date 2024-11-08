export interface UserItem {
  memberId: number;
  memberNickName: string;
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
