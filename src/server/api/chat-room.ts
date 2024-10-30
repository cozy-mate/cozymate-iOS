import { GetAxiosInstance, DeleteAxiosInstance } from '@axios/axios.method';

import {
  GetChatRoomIdResponse,
  DeleteChatRoomResponse,
  GetChatRoomListResponse,
} from '@server/responseTypes/chat-room';

// 쪽지방 삭제 기능
export const deleteChatRoom = async (chatRoomId: number): Promise<DeleteChatRoomResponse> => {
  const response = await DeleteAxiosInstance<DeleteChatRoomResponse>(`/chatrooms/${chatRoomId}`);

  return response.data;
};

// 쪽지방 목록 조회
export const getChatRoomList = async (): Promise<GetChatRoomListResponse> => {
  const response = await GetAxiosInstance<GetChatRoomListResponse>(`/chatrooms`);

  return response.data;
};

// 쪽지방 반환
export const getChatRoomId = async (recipientId: number): Promise<GetChatRoomIdResponse> => {
  const response = await GetAxiosInstance<GetChatRoomIdResponse>(
    `/chatrooms/members/${recipientId}`,
  );

  return response.data;
};
