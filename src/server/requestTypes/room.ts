export interface UpdateRoomRequest {
  name: string;
  persona: number;
  hashtagList?: string[];
}

export interface CreatePublicRoomRequest {
  name: string;
  persona: number;
  maxMateNum: number;
  hashtagList: string[];
}

export interface CreatePrivateRoomRequest {
  name: string;
  persona: number;
  maxMateNum: number;
}
