export interface GetRandomRoomResponse {
  result: {
    page: number;
    hasNext: boolean;
    result: {
      roomId: number;
      name: string;
      hashtags: string[];
      equality: number | undefined;
      numOfArrival: number;
      maxMateNum: number;
      preferenceMatchCountList: {
        preferenceName: string;
        count: number;
      }[];
    }[];
  };
}
