import { RoomItem } from '@/type/room';

export interface GetRoomDetailResponse {
  result: RoomItem;
}

export interface GetSentRequestRoomListResponse {
  result: {
    page: number;
    hasNext: boolean;
    result: RoomItem[];
  };
}

export interface CheckHasRoomResponse {
  result: {
    roomId: number;
    isRoomManager: boolean;
  };
}

export interface CheckIsRequestedRoomResponse {
  result: boolean;
}

export interface SendRoomRequestRequest {
  result: string;
}

export interface GetReceivedRequestListResponse {
  result: {
    memberId: number;
    mateId: number;
    nickname: string;
    persona: number;
    mateEquality: number;
  }[];
}

export interface InviteMemberResponse {
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
    isRoomManager: true;
    favoriteId: number;
    maxMateNum: number;
    arrivalMateNum: number;
    dormitoryName: string;
    roomType: string;
    hashtagList: string[];
    equality: number;
    difference: {
      blue: string[];
      red: string[];
      white: string[];
    };
  };
}

export interface ExitRoomResponse {
  result: string;
}

export interface CheckRoomNameResponse {
  result: boolean;
}

export interface CheckIsInvitedMemberResponse {
  result: boolean;
}

export interface CheckIsRequestedMemberResponse {
  result: boolean;
}

export interface CancelInviteMemberResponse {
  result: string;
}

export interface CancelRequestRoomResponse {
  result: string;
}

export interface CheckIsInvitedRoomResponse {
  result: boolean;
}

export interface SearchRoomResponse {
  result: {
    roomId: number;
    name: string;
    arrivalMateNum: number;
    equality: number;
  }[];
}

export interface AcceptRoomRequestResponse {
  result: string;
}

export interface AcceptRoomInviteResponse {
  result: string;
}

export interface JoinRoomResponse {
  result: string;
}

export interface GetRoomByInviteCodeResponse {
  result: RoomItem;
}

export interface UpdateRoomInfoResponse {
  result: RoomItem;
}
