import { GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';

import { SendMessageRequest } from './request';
import { GetMessageRoomDetailResponse, SendMessageResponse } from './response';

// 쪽지방의 쪽지 상세 내역 조회
export const getMessageRoomDetail = async (
  messageRoomId: number,
  page?: number,
  size?: number,
): Promise<GetMessageRoomDetailResponse> => {
  const response = await GetAxiosInstance<GetMessageRoomDetailResponse>(
    `/messages/messagerooms/${messageRoomId}`,
    {
      params: {
        page,
        size,
      },
    },
  );

  return response.data;
};

// 쪽지 작성 기능
export const sendMessage = async (
  recipientId: number,
  data: SendMessageRequest,
): Promise<SendMessageResponse> => {
  const response = await PostAxiosInstance<SendMessageResponse>(
    `/messages/members/${recipientId}`,
    data,
  );

  return response.data;
};
