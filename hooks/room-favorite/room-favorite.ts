import { useMutation, useSuspenseInfiniteQuery } from '@tanstack/react-query';

import {
  createRoomLike,
  deleteRoomLike,
  getRoomLikeList,
} from '@/server/room-favorite/room-favorite';

export const useDeleteRoomLike = (roomFavoriteId: number, refetch: () => void) => {
  return useMutation({
    mutationFn: () => deleteRoomLike(roomFavoriteId),
    onSuccess: () => refetch(),
  });
};

export const useGetRoomLikeList = () => {
  return useSuspenseInfiniteQuery({
    queryKey: [`/favorites/rooms`],
    queryFn: ({ pageParam }) => getRoomLikeList(pageParam, 5),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};

export const useCreateRoomLike = (roomId: number, refetch: () => void) => {
  return useMutation({
    mutationFn: () => createRoomLike(roomId),
    onSuccess: () => refetch(),
  });
};
