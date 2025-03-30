export interface GetRoomLogResponse {
  result: {
    page: number;
    hasNext: boolean;
    result: {
      content: string;
      createdAt: string;
    }[];
  };
}
