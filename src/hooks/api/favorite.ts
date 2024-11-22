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
  refetch: () => void,
): UseMutationResult<DeleteFavoriteResponse> => {
  return useMutation({
    mutationFn: () => deleteFavorite(favoriteId),
    onSuccess: () => refetch(),
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
export const useDibsOnRoom = (
  roomId: number,
  refetch: () => void,
): UseMutationResult<DibsOnRoomResponse> => {
  return useMutation({
    mutationFn: () => dibsOnRoom(roomId),
    onSuccess: () => refetch(),
  });
};

// 사용자 찜하기
export const useDibsOnUser = (
  memberId: number,
  refetch: () => void,
): UseMutationResult<DibsOnUserResponse> => {
  return useMutation({
    mutationFn: () => dibsOnUser(memberId),
    onSuccess: () => refetch(),
  });
};
