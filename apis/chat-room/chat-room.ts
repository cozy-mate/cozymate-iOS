import { DeleteAxiosInstance, GetAxiosInstance } from '@/axios/axios.method';

import {
  ExitChatRoomResponse,
  GetChatRoomIdResponse,
  GetChatRoomListResponse,
  GetNewChatRoomCountResponse,
} from './response';

// 쪽지방 삭제 기능
export const exitChatRoom = async (chatRoomId: number): Promise<ExitChatRoomResponse> => {
  const response = await DeleteAxiosInstance<ExitChatRoomResponse>(`/chatrooms/${chatRoomId}`);

  return response.data;
};

// 쪽지방 목록 조회
export const getChatRoomList = async (
  page?: number,
  size?: number,
): Promise<GetChatRoomListResponse> => {
  const response = await GetAxiosInstance<GetChatRoomListResponse>(`/chatrooms`, {
    params: { page, size },
  });

  return response.data;
};

// 쪽지방 반환
export const getChatRoomId = async (recipientId: number): Promise<GetChatRoomIdResponse> => {
  const response = await GetAxiosInstance<GetChatRoomIdResponse>(
    `/chatrooms/members/${recipientId}`,
  );

  return response.data;
};

// 새로운 쪽지가 온 쪽지방의 개수 반환
export const getNewChatRoomCount = async (): Promise<GetNewChatRoomCountResponse> => {
  const response = await GetAxiosInstance<GetNewChatRoomCountResponse>(`/chatrooms/count/new-chat`);

  return response.data;
};
