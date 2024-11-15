export interface GetChatDetailDataResponse {
  result: {
    memberId: number;
    content: {
      nickname: string;
      content: string;
      datetime: string;
    }[];
  };
}

export interface SendChatResponse {
  result: {
    chatRoomId: number;
  };
}
