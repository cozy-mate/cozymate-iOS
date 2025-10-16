import { MessageData } from '@/type/message';

export interface GetMessageRoomDetailResponse {
  result: {
    page: number;
    hasNext: boolean;
    result: {
      memberId: number;
      content: MessageData[];
    };
  };
}

export interface SendMessageResponse {
  result: {
    messageRoomId: number;
  };
}
