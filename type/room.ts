export type RoomItem = {
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
