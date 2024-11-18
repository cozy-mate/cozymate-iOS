import {
  useMutation,
  useSuspenseQuery,
  UseMutationResult,
  UseSuspenseQueryResult,
} from '@tanstack/react-query';

import {
  dibsOnRoom,
  dibsOnUser,
  deleteFavorite,
  getFavoriteRoomList,
  getFavoriteUserList,
} from '@server/api/favorite';
import {
  DibsOnRoomResponse,
  DibsOnUserResponse,
  DeleteFavoriteResponse,
  GetFavoriteRoomListResponse,
  GetFavoriteUserListResponse,
} from '@server/responseTypes/favorite';

export const useDeleteFavorite = (
  favoriteId: number,
): UseMutationResult<DeleteFavoriteResponse> => {
  return useMutation({
    mutationFn: () => deleteFavorite(favoriteId),
    onSuccess: () => console.log('찜 제거'),
  });
};

// 찜한 방 목록 조회
export const useGetFavoriteRoomList = (): UseSuspenseQueryResult<
  GetFavoriteRoomListResponse,
  void
> => {
  return useSuspenseQuery({
    queryKey: [`/favorites/rooms`],
    queryFn: () => getFavoriteRoomList(),
  });
};

// 찜한 사용자 목록 조회
export const useGetFavoriteUserList = (): UseSuspenseQueryResult<
  GetFavoriteUserListResponse,
  void
> => {
  return useSuspenseQuery({
    queryKey: [`/favorites/members`],
    queryFn: () => getFavoriteUserList(),
  });
};

// 방 찜하기
export const useDibsOnRoom = (roomId: number): UseMutationResult<DibsOnRoomResponse> => {
  return useMutation({
    mutationFn: () => dibsOnRoom(roomId),
    onSuccess: () => console.log('방 찜 성공'),
  });
};

// 사용자 찜하기
export const useDibsOnUser = (memberId: number): UseMutationResult<DibsOnUserResponse> => {
  return useMutation({
    mutationFn: () => dibsOnUser(memberId),
    onSuccess: () => console.log('유저 찜 성공'),
  });
};
