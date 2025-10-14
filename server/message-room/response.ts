import { MessageRoomData } from '@/type/message';

export interface ExitMessageRoomResponse {
  result: string;
}

export interface GetMessageRoomListResponse {
  result: {
    page: number;
    hasNext: boolean;
    result: MessageRoomData[];
  };
}

export interface GetMessageRoomIdResponse {
  result: {
    messageRoomId: number;
  };
}

export interface GetNewMessageRoomCountResponse {
  result: {
    messageRoomsWithNewMessageCount: number;
  };
}
