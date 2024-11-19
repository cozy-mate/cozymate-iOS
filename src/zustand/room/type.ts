import { LifestyleOptionKey } from '@utils/getLifeStyleIcon';

export interface MyRoom {
  hasRoom: boolean;
  roomId: number;
}

// 공개방 생성 정보
export interface CreatePublicRoomInfo {
  name: string;
  persona: number;
  maxMateNum: number;
  hashtagList: string[];
}

// 비공개방 생성 정보
export interface CreatePrivateRoomInfo {
  name: string;
  persona: number;
  maxMateNum: number;
}

// 생성된 방 정보
export type RoomInfo = {
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
  isFavorited: boolean;
  maxMateNum: number;
  arrivalMateNum: number;
  dormitoryName: string;
  roomType: string;
  hashtagList: string[];
  equality: number;
  difference: {
    blue: LifestyleOptionKey[];
    red: LifestyleOptionKey[];
    white: LifestyleOptionKey[];
  };
};

export type InviteCodeRoomInfo = {
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
  isFavorited: boolean;
  maxMateNum: number;
  arrivalMateNum: number;
  dormitoryName: string;
  roomType: string;
  hashtagList: string[];
  equality: number;
  difference: {
    blue: LifestyleOptionKey[];
    red: LifestyleOptionKey[];
    white: LifestyleOptionKey[];
  };
};
