import { GetAxiosInstance, PostAxiosInstance } from '@axios/axios.method';
import { SendChatRequest } from '@server/requestTypes/chat';
import { GetChatDetailDataResponse, SendChatResponse } from '@server/responseTypes/chat';

// 쪽지방의 쪽지 상세 내역 조회
export const getChatDetailData = async (chatRoomId: number): Promise<GetChatDetailDataResponse> => {
  const response = await GetAxiosInstance<GetChatDetailDataResponse>(
    `/chats/chatrooms/${chatRoomId}`,
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
