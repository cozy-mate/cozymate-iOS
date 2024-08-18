export interface RequestInviteRequest {
  memberId: number;
}

export interface CreateRoomRequest {
  name: string;
  profileImage: number;
  maxMateNum: number;
}
