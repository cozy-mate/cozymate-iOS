export interface DeleteChatRoomResponse {
  result: string;
}

export interface GetChatRoomListResponse {
  result: {
    nickname: string;
    lastContent: string;
    chatRoomId: number;
  }[];
}
