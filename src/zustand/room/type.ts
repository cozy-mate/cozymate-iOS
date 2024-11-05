import { LifestyleOptionKey } from '@utils/getLifeStyleIcon';

export interface MyRoom {
  hasRoom: boolean;
  roomId: number;
}

// 공개방 생성 정보
export interface CreatePublicRoomInfo {
  name: string;
  profileImage: number;
  maxMateNum: number;
  hashtags: string[];
}

// 비공개방 생성 정보
export interface CreatePrivateRoomInfo {
  name: string;
  profileImage: number;
  maxMateNum: number;
}

export type MateType = {
  memberId: number;
  mateId: number;
  nickname: string;
  persona: number;
  mateEquality: number;
};

// 생성된 방 정보
export type RoomInfo = {
  roomId: number;
  name: string;
  inviteCode: string;
  profileImage: number;
  mateList: MateType[];
  managerId: number;
  isRoomManager: boolean;
  maxMateNum: number;
  numOfArrival: number;
  roomType: string;
  hashtags: string[];
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
  managerName: string;
  maxMateNum: number;
};
