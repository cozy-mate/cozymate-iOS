import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getMyRoomFeed } from './feed';

export const feedQueries = createQueryKeys('feed', {
  detail: {
    queryKey: null,
    queryFn: () => getMyRoomFeed(),
  },
});
