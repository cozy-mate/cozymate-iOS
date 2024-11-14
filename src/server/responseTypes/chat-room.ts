export interface DeleteChatRoomResponse {
  result: string;
}

export interface GetChatRoomListResponse {
  result: {
    persona: number;
    nickname: string;
    lastContent: string;
    chatRoomId: number;
    memberId: number;
  }[];
}

export interface GetChatRoomIdResponse {
  result: {
    chatRoomId: number;
  };
}
