export interface GetChatDetailDataResponse {
  result: {
    nickname: string;
    content: string;
    dateTime: string;
  }[];
}

export interface SendChatResponse {
  result: string;
}
