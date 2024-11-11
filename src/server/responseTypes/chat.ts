export interface GetChatDetailDataResponse {
  result: {
    memberId: number;
    content: {
      nickname: string;
      content: string;
      dateTime: string;
    }[];
  };
}

export interface SendChatResponse {
  result: {
    chatRoomId: number;
  };
}
