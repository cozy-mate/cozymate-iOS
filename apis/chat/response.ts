export interface GetChatRoomDetailResponse {
  result: {
    page: number;
    hasNext: boolean;
    result: {
      memberId: number;
      content: {
        nickname: string;
        content: string;
        datetime: string;
      }[];
    };
  };
}

export interface SendChatResponse {
  result: {
    chatRoomId: number;
  };
}
