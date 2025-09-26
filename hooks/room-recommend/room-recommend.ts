import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

import { SortTypeValue } from '@/constants/items/sortItem';
import { getRecommendRoomList } from '@/server/room-recommend/room-recommend';
import { queries } from '@/server';
import { GetRecommendRoomListResponse } from '@/server/room-recommend/response';

export const useGetHomeRecommendRoomList = () => {
  return useSuspenseQuery({
    ...queries.roomRecommend.home(),
    queryFn: () => getRecommendRoomList(5, 0),
  });
};

export const useGetRecommendRoomList = (getSortType: () => SortTypeValue) => {
  return useSuspenseInfiniteQuery({
    ...queries.roomRecommend.list({ size: 5, sortType: getSortType() }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: GetRecommendRoomListResponse) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};
