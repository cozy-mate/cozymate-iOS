export interface DeleteRoomLikeResponse {
  result: string;
}

export interface GetRoomLikeListResponse {
  result: {
    page: number;
    hasNext: boolean;
    result: {
      roomFavoriteId: number;
      equality: number;
      roomId: number;
      name: string;
      preferenceMatchCountList: {
        preferenceName: string;
        count: number;
      }[];
      hashtagList: string[];
      maxMateNum: number;
      currentMateNum: number;
    }[];
  };
}

export interface CreateRoomLikeResponse {
  result: string;
}
