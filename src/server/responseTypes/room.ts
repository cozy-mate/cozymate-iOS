import { LifestyleOptionKey } from '@utils/getLifeStyleIcon';

export interface DeleteRoomResponse {
  result: string;
}

export interface GetRoomDataResponse {
  result: {
    roomId: number;
    name: string;
    inviteCode: string;
    persona: number;
    mateDetailList: {
      memberId: number;
      mateId: number;
      nickname: string;
      persona: number;
      mateEquality: number;
    }[];
    managerMemberId: number;
    managerNickname: string;
    isRoomManager: boolean;
    maxMateNum: number;
    arrivalMateNum: number;
    roomType: string;
    hashtagList: string[];
    equality: number;
    difference: {
      blue: LifestyleOptionKey[];
      red: LifestyleOptionKey[];
      white: LifestyleOptionKey[];
    };
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

export interface UpdateRoomResponse {
  result: {
    roomId: number;
    name: string;
    inviteCode: string;
    persona: number;
    mateDetailList: {
      memberId: number;
      mateId: number;
      nickname: string;
      persona: number;
      mateEquality: number;
    }[];
    managerMemberId: number;
    managerNickname: string;
    isRoomManager: boolean;
    maxMateNum: number;
    arrivalMateNum: number;
    roomType: string;
    hashtagList: string[];
    equality: number;
    difference: {
      blue: LifestyleOptionKey[];
      red: LifestyleOptionKey[];
      white: LifestyleOptionKey[];
    };
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

export interface CreatePublicRoomResponse {
  result: {
    roomId: number;
    name: string;
    inviteCode: string;
    persona: number;
    mateDetailList: {
      memberId: number;
      mateId: number;
      nickname: string;
      persona: number;
      mateEquality: number;
    }[];
    managerMemberId: number;
    managerNickname: string;
    isRoomManager: boolean;
    maxMateNum: number;
    arrivalMateNum: number;
    roomType: string;
    hashtagList: string[];
    equality: number;
    difference: {
      blue: LifestyleOptionKey[];
      red: LifestyleOptionKey[];
      white: LifestyleOptionKey[];
    };
  };
}

export interface CreatePrivateRoomResponse {
  result: {
    roomId: number;
    name: string;
    inviteCode: string;
    persona: number;
    mateDetailList: {
      memberId: number;
      mateId: number;
      nickname: string;
      persona: number;
      mateEquality: number;
    }[];
    managerMemberId: number;
    managerNickname: string;
    isRoomManager: boolean;
    maxMateNum: number;
    arrivalMateNum: number;
    roomType: string;
    hashtagList: string[];
    equality: number;
    difference: {
      blue: LifestyleOptionKey[];
      red: LifestyleOptionKey[];
      white: LifestyleOptionKey[];
    };
  };
}
