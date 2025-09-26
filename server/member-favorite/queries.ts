import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getMemberLikeList } from './member-favorite';

export const memberFavoriteQueries = createQueryKeys('memberFavorite', {
  getMemberLikeList: ({ page, size }: { page?: number; size?: number } = {}) => ({
    queryKey: ['list', page, size],
    queryFn: () => getMemberLikeList(page, size),
  }),
});
