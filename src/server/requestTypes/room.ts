export interface UpdateRoomRequest {
  name: string;
  hashtags?: string[];
}

export interface CreatePublicRoomRequest {
  name: string;
  profileImage: number;
  maxMateNum: number;
  hashtags: string[];
}

export interface CreatePrivateRoomRequest {
  name: string;
  profileImage: number;
  maxMateNum: number;
}
