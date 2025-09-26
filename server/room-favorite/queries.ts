import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getRoomLikeList } from './room-favorite';

export const roomFavoriteQueries = createQueryKeys('roomFavorite', {
  list: () => ({
    queryKey: ['list'],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) => getRoomLikeList(pageParam, 5),
  }),
});
