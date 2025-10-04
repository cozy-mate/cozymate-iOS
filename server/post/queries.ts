import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getPostList, getPostDetail } from './post';

export const postQueries = createQueryKeys('post', {
  list: ({ roomId }: { roomId: number }) => ({
    queryKey: [roomId],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) =>
      getPostList({ roomId, page: pageParam }),
  }),
  detail: ({ roomId, postId }: { roomId: number; postId: number }) => ({
    queryKey: [roomId, postId],
    queryFn: () => getPostDetail({ roomId, postId }),
  }),
});
