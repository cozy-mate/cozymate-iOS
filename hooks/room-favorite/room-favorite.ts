import { useMutation, useQueryClient, useSuspenseInfiniteQuery } from '@tanstack/react-query';

import {
  createRoomLike,
  deleteRoomLike,
  getRoomLikeList,
} from '@/server/room-favorite/room-favorite';
import { matchMultiQueries, queries } from '@/server';
import { GetRoomLikeListResponse } from '@/server/room-favorite/response';

export const useDeleteRoomLike = (roomFavoriteId: number, roomId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteRoomLike(roomFavoriteId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: matchMultiQueries([
          queries.room.detail({ roomId }).queryKey,
          queries.roomFavorite.list._def,
        ]),
      });
    },
  });
};

export const useGetRoomLikeList = () => {
  return useSuspenseInfiniteQuery({
    ...queries.roomFavorite.list(),
    initialPageParam: 0,
    getNextPageParam: (lastPage: GetRoomLikeListResponse) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};

export const useCreateRoomLike = (roomId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createRoomLike(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: matchMultiQueries([
          queries.room.detail({ roomId }).queryKey,
          queries.roomFavorite.list._def,
        ]),
      });
    },
  });
};
