export interface GetChatDetailDataResponse {
  result: {
    recipientId: number;
    chatContents: {
      nickname: string;
      content: string;
      dateTime: string;
    }[];
  };
}

export interface SendChatResponse {
  result: string;
}
