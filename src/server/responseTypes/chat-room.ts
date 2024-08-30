export interface DeleteChatRoomResponse {
  result: string;
}

export interface GetChatRoomListResponse {
  result: {
    persona: number;
    nickName: string;
    lastContent: string;
    chatRoomId: number;
  }[];
}
