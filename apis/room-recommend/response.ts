export interface GetRecommendRoomListResponse {
  result: {
    page: number;
    hasNext: boolean;
    result: {
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
    }[];
  };
}
