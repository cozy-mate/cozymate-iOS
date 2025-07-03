import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import { SortTypeValue } from '@/constants/items/sortItem';
import { getRecommendRoomList } from '@/server/room-recommend/room-recommend';

export const useGetHomeRecommendRoomList = () => {
  return useSuspenseQuery({
    queryKey: [`/rooms/list/home`],
    queryFn: () => getRecommendRoomList(5, 0),
  });
};

export const useGetRecommendRoomList = (getSortType: () => SortTypeValue) => {
  return useSuspenseInfiniteQuery({
    queryKey: [`/rooms/list`],
    queryFn: ({ pageParam = 0 }) => {
      const sortType = getSortType();
      return getRecommendRoomList(5, pageParam, sortType);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};
