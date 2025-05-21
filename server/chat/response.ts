import { ChatData } from '@/type/chat';

export interface GetChatRoomDetailResponse {
  result: {
    page: number;
    hasNext: boolean;
    result: {
      memberId: number;
      content: ChatData[];
    };
  };
}

export interface SendChatResponse {
  result: {
    chatRoomId: number;
  };
}
