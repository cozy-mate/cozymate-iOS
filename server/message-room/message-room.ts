import { DeleteAxiosInstance, GetAxiosInstance } from '@/axios/axios.method';

import {
  ExitMessageRoomResponse,
  GetMessageRoomIdResponse,
  GetMessageRoomListResponse,
  GetNewMessageRoomCountResponse,
} from './response';

// 쪽지방 삭제 기능
export const exitMessageRoom = async (messageRoomId: number): Promise<ExitMessageRoomResponse> => {
  const response = await DeleteAxiosInstance<ExitMessageRoomResponse>(
    `/messagerooms/${messageRoomId}`,
  );

  return response.data;
};

// 쪽지방 목록 조회
export const getMessageRoomList = async (
  page?: number,
  size?: number,
): Promise<GetMessageRoomListResponse> => {
  const response = await GetAxiosInstance<GetMessageRoomListResponse>(`/messagerooms`, {
    params: { page, size },
  });

  return response.data;
};

// 쪽지방 반환
export const getMessageRoomId = async (recipientId: number): Promise<GetMessageRoomIdResponse> => {
  const response = await GetAxiosInstance<GetMessageRoomIdResponse>(
    `/messagerooms/members/${recipientId}`,
  );

  return response.data;
};

// 새로운 쪽지가 온 쪽지방의 개수 반환
export const getNewMessageRoomCount = async (): Promise<GetNewMessageRoomCountResponse> => {
  const response = await GetAxiosInstance<GetNewMessageRoomCountResponse>(
    `/messagerooms/count/new-message`,
  );

  return response.data;
};
