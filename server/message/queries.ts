import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getMessageRoomDetail } from './message';

export const messageQueries = createQueryKeys('message', {
  detail: ({ messageRoomId, size = 5 }: { messageRoomId: number; size: number }) => ({
    queryKey: [messageRoomId, size],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) =>
      getMessageRoomDetail(messageRoomId, pageParam, size),
  }),
});
