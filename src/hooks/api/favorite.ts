import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query';

import { getFavoriteRoomList, getFavoriteUserList } from '@server/api/favorite';
import {
  GetFavoriteRoomListResponse,
  GetFavoriteUserListResponse,
} from '@server/responseTypes/favorite';

export const useGetFavoriteRoomList = (): UseSuspenseQueryResult<
  GetFavoriteRoomListResponse,
  void
> => {
  return useSuspenseQuery({
    queryKey: [`/favorites/rooms`],
    queryFn: () => getFavoriteRoomList(),
  });
};

export const useGetFavoriteUserList = (): UseSuspenseQueryResult<
  GetFavoriteUserListResponse,
  void
> => {
  return useSuspenseQuery({
    queryKey: [`/favorites/members`],
    queryFn: () => getFavoriteUserList(),
  });
};
