import { GetAxiosInstance, PostAxiosInstance, DeleteAxiosInstance } from '@axios/axios.method';

import {
  DibsOnRoomResponse,
  DibsOnUserResponse,
  DeleteFavoriteResponse,
  GetFavoriteRoomListResponse,
  GetFavoriteUserListResponse,
} from '@server/responseTypes/favorite';

// 사용자/방 찜 삭제
export const deleteFavorite = async (favoriteId: number): Promise<DeleteFavoriteResponse> => {
  const response = await DeleteAxiosInstance<DeleteFavoriteResponse>(`/favorites/${favoriteId}`);

  return response.data;
};

// 찜한 방 목록 조회
export const getFavoriteRoomList = async (): Promise<GetFavoriteRoomListResponse> => {
  const response = await GetAxiosInstance<GetFavoriteRoomListResponse>(`/favorites/rooms`);

  return response.data;
};

// 찜한 사용자 목록 조회
export const getFavoriteUserList = async (): Promise<GetFavoriteUserListResponse> => {
  const response = await GetAxiosInstance<GetFavoriteUserListResponse>(`/favorites/members`);

  return response.data;
};

// 방 찜하기
export const dibsOnRoom = async (roomId: number): Promise<DibsOnRoomResponse> => {
  const response = await PostAxiosInstance<DibsOnRoomResponse>(`/favorites/rooms/${roomId}`);

  return response.data;
};

// 사용자 찜하기
export const dibsOnUser = async (memberId: number): Promise<DibsOnUserResponse> => {
  const response = await PostAxiosInstance<DibsOnUserResponse>(`/favorites/members/${memberId}`);

  return response.data;
};
