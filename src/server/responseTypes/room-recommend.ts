export interface GetRandomRoomResponse {
  result: {
    page: number;
    hasNext: boolean;
    result: {
      recommendations: {
        roomId: number;
        name: string;
        hashtags: string[];
        equality: number;
        numOfArrival: number;
        maxMateNum: number;
        equalMemberStatNum: Record<string, number>;
      }[];
    };
  };
}
