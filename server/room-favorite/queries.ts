import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getRoomLikeList } from './room-favorite';

export const roomFavoriteQueries = createQueryKeys('roomFavorite', {
  getRoomLikeList: ({ page, size }: { page?: number; size?: number } = {}) => ({
    queryKey: ['list', page, size],
    queryFn: () => getRoomLikeList(page, size),
  }),
});
