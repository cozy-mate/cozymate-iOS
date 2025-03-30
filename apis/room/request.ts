export interface CreatePublicRoomRequest {
  name: string;
  persona: number;
  maxMateNum: number;
  hashtagList: string[];
}
