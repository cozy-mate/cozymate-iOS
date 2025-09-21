import { MemberDetail } from './member';

export type MateDetail = {
  memberId: number;
  mateId: number;
  nickname: string;
  persona: number;
  mateEquality: number;
};

export type RecommendRoomItem = {
  roomId: number;
  name: string;
  hashtags: string[];
  equality: number | null;
  numOfArrival: number;
  maxMateNum: number;
  preferenceMatchCountList: {
    preferenceName: string;
    count: number | null;
  }[];
  roomFavoriteId?: number;
};

export type RoomItem = {
  roomId: number;
  name: string;
  inviteCode: string;
  persona: number;
  mateDetailList: MateDetail[];
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

export type ChipItem = {
  title: string;
  memberList: {
    memberDetail: MemberDetail;
    memberStat: Record<string, string>;
  }[];
  color: string;
};
