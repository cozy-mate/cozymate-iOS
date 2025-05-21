import { GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';

import { SendChatRequest } from './request';
import { GetChatRoomDetailResponse, SendChatResponse } from './response';

// 쪽지방의 쪽지 상세 내역 조회
export const getChatRoomDetail = async (
  chatRoomId: number,
  page?: number,
  size?: number,
): Promise<GetChatRoomDetailResponse> => {
  const response = await GetAxiosInstance<GetChatRoomDetailResponse>(
    `/chats/chatrooms/${chatRoomId}`,
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
export const sendChat = async (
  recipientId: number,
  data: SendChatRequest,
): Promise<SendChatResponse> => {
  const response = await PostAxiosInstance<SendChatResponse>(`/chats/members/${recipientId}`, data);

  return response.data;
};
