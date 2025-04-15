import { ChatRoomData } from '@/type/chat';

export interface ExitChatRoomResponse {
  result: string;
}

export interface GetChatRoomListResponse {
  result: {
    page: number;
    hasNext: boolean;
    result: ChatRoomData[];
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
