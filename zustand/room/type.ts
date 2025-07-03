export interface RoomInfo {
  roomId: number;
  isRoomManager: boolean;
}

export interface CreateRoomInfo {
  name: string;
  persona: number;
  maxMateNum: number;
  hashtagList: string[];
}
