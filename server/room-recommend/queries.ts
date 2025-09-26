import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getRecommendRoomList } from './room-recommend';

export const roomRecommendQueries = createQueryKeys('roomRecommend', {
  getRoomRecommendList: ({
    page,
    size,
    sortType,
  }: {
    page: number;
    size: number;
    sortType?: string;
  }) => ({
    queryKey: ['list', page, size, sortType],
    queryFn: () => getRecommendRoomList(size, page, sortType),
  }),
});
