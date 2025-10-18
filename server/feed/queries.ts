import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getMyRoomFeed } from './feed';

export const feedQueries = createQueryKeys('feed', {
  detail: ({ roomId }: { roomId: number }) => ({
    queryKey: ['detail', roomId],
    queryFn: () => getMyRoomFeed({ roomId }),
  }),
});
