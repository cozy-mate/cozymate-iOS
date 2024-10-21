export interface DeleteRoomResponse {
  result: string;
}

export interface GetRoomDataResponse {
  result: {
    roomId: number;
    name: string;
    inviteCode: string;
    profileImage: number;
    mateList: {
      memberId: number;
      mateId: number;
      nickname: string;
    }[];
    roomType: string;
    hashtags: string[];
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

export interface CheckRoomNameResponse {
  result: boolean;
}

export interface ExitRoomResponse {
  result: string;
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

export interface CreatePublicRoomResponse {
  result: {
    roomId: number;
    name: string;
    inviteCode: string;
    profileImage: number;
    mateList: {
      memberId: number;
      mateId: number;
      nickname: string;
    }[];
    roomType: string;
    hashtags: string[];
  };
}

export interface CreatePrivateRoomResponse {
  result: {
    roomId: number;
    name: string;
    inviteCode: string;
    profileImage: number;
    mateList: {
      memberId: number;
      mateId: number;
      nickname: string;
    }[];
    roomType: string;
    hashtags: string[];
  };
}
