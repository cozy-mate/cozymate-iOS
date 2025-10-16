import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getCommentList } from './comment';
import { GetCommentListRequest } from './request';

export const commentQueries = createQueryKeys('comment', {
  list: ({ roomId, postId }: GetCommentListRequest) => ({
    queryKey: [roomId, postId],
    queryFn: () => getCommentList({ roomId, postId }),
  }),
});
