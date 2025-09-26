import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getRecommendRoomList } from './room-recommend';

export const roomRecommendQueries = createQueryKeys('roomRecommend', {
  list: ({ size, sortType }: { size: number; sortType?: string }) => ({
    queryKey: ['list', size, sortType],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) =>
      getRecommendRoomList(size, pageParam, sortType),
  }),
  home: () => ({
    queryKey: ['home'],
    queryFn: () => getRecommendRoomList(5, 0),
  }),
});
