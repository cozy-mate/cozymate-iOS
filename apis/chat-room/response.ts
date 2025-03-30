export interface ExitChatRoomResponse {
  result: string;
}

export interface GetChatRoomListResponse {
  result: {
    page: number;
    hasNext: boolean;
    result: {
      persona: number;
      nickname: string;
      lastContent: string;
      chatRoomId: number;
      memberId: number;
      hasNewChat: boolean;
    }[];
  };
}

export interface GetChatRoomIdResponse {
  result: {
    chatRoomId: number;
  };
}

export interface GetNewChatRoomCountResponse {
  result: {
    chatRoomsWithNewChatCount: number;
  };
}
