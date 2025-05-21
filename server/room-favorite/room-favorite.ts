import { DeleteAxiosInstance, GetAxiosInstance, PostAxiosInstance } from '@/axios/axios.method';

import {
  CreateRoomLikeResponse,
  DeleteRoomLikeResponse,
  GetRoomLikeListResponse,
} from './response';

// 방 찜 삭제
export const deleteRoomLike = async (roomFavoriteId: number): Promise<DeleteRoomLikeResponse> => {
  const response = await DeleteAxiosInstance<DeleteRoomLikeResponse>(
    `/favorites/rooms/${roomFavoriteId}`,
  );

  return response.data;
};

// 찜한 방 목록 조회
export const getRoomLikeList = async (
  page?: number,
  size?: number,
): Promise<GetRoomLikeListResponse> => {
  const response = await GetAxiosInstance<GetRoomLikeListResponse>(`/favorites/rooms`, {
    params: {
      page,
      size,
    },
  });

  return response.data;
};

// 방 찜하기
export const createRoomLike = async (roomId: number): Promise<CreateRoomLikeResponse> => {
  const response = await PostAxiosInstance<CreateRoomLikeResponse>(`/favorites/rooms/${roomId}`);

  return response.data;
};
