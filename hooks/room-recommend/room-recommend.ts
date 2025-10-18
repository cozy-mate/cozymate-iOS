import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { queries } from '@/server';
import { GetRecommendRoomListResponse } from '@/server/room-recommend/response';

export const useGetHomeRecommendRoomList = () => {
  return useQuery(queries.roomRecommend.home());
};

export const useGetRecommendRoomList = (getSortType: () => SortTypeValue) => {
  return useInfiniteQuery({
    ...queries.roomRecommend.list({ size: 5, sortType: getSortType() }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: GetRecommendRoomListResponse) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};
