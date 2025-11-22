export interface CreatePublicRoomRequest {
  name: string;
  persona: number;
  maxMateNum: number;
  // hashtagList: string[];
  description: string;
}

export interface UpdateRoomInfoRequest {
  name: string;
  persona: number;
  hashtagList: string[];
}
