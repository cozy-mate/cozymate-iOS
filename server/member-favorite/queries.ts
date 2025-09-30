import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getMemberLikeList } from './member-favorite';

export const memberFavoriteQueries = createQueryKeys('memberFavorite', {
  list: ({ size }: { size?: number } = {}) => ({
    queryKey: ['list', size],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) => getMemberLikeList(pageParam, size),
  }),
});
