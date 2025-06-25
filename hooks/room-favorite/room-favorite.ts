import { useMutation, useQueryClient, useSuspenseInfiniteQuery } from '@tanstack/react-query';

import {
  createRoomLike,
  deleteRoomLike,
  getRoomLikeList,
} from '@/server/room-favorite/room-favorite';

export const useDeleteRoomLike = (roomFavoriteId: number, roomId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteRoomLike(roomFavoriteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}`, roomId] });
      queryClient.invalidateQueries({ queryKey: [`/favorites/rooms`] });
    },
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

export const useCreateRoomLike = (roomId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createRoomLike(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/rooms/${roomId}`, roomId] });
      queryClient.invalidateQueries({ queryKey: [`/favorites/rooms`] });
    },
  });
};
