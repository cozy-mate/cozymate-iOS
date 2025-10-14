import { createQueryKeys } from '@lukemorales/query-key-factory';

import { getMessageRoomId, getMessageRoomList, getNewMessageRoomCount } from './message-room';

export const messageRoomQueries = createQueryKeys('messageRooms', {
  list: ({ size = 5 }: { size?: number } = {}) => ({
    queryKey: ['list', size],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) => getMessageRoomList(pageParam, size),
  }),
  id: ({ recipientId }: { recipientId: number }) => ({
    queryKey: ['id', recipientId],
    queryFn: () => getMessageRoomId(recipientId),
  }),
  countNewMessage: () => ({
    queryKey: ['count', 'new-message'],
    queryFn: () => getNewMessageRoomCount(),
  }),
});
