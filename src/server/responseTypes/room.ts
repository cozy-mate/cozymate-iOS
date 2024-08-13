export interface DeleteRoomResponse {
  result: string;
}

export interface GetRoomDataResponse {
  result: {
    name: string;
    inviteCode: string;
    profileImage: number;
  };
}

export interface GetRoomDataByInviteCodeResponse {
  result: {
    roomId: number;
    name: string;
    managerName: string;
    maxMateNum: number;
  };
}

export interface JoinRoomResponse {
  result: string;
}

export interface CreateRoomResponse {
  result: string;
}
