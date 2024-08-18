export interface DeleteRoomResponse {
  result: string;
}

export interface GetRoomDataResponse {
  result: {
    roomId: number;
    name: string;
    inviteCode: string;
    profileImage: number;
  };
}

export interface GetMateListsResponse {
  result: {
    memberId: number;
    nickname: string;
  }[];
}

export interface GetInviteRequestResponse {
  result: {
    roomId: number;
    managerNickname: string;
    roomName: string;
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

export interface CheckHasRoomResponse {
  result: {
    roomId: number;
  };
}

export interface JoinRoomResponse {
  result: string;
}

export interface RequestInviteResponse {
  result: string;
}

export interface AcceptInviteResponse {
  result: string;
}

export interface CreateRoomResponse {
  result: {
    roomId: number;
    name: string;
    inviteCode: string;
    profileImage: number;
  };
}
