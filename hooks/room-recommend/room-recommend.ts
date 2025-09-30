import { useInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getRecommendRoomList } from '@/server/room-recommend/room-recommend';

export const useGetHomeRecommendRoomList = () => {
  return useSuspenseQuery({
    queryKey: [`/rooms/list/home`],
    queryFn: () => getRecommendRoomList(5, 0),
  });
};

export const useGetRecommendRoomList = (sortType: string) => {
  return useInfiniteQuery({
    queryKey: [`/rooms/list`],
    queryFn: ({ pageParam }) => getRecommendRoomList(5, pageParam, sortType),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};
