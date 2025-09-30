import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getChatRoomId, getChatRoomList, getNewChatRoomCount } from './chat-room';

export const chatRoomQueries = createQueryKeys('chatRooms', {
  list: ({ size = 5 }: { size?: number } = {}) => ({
    queryKey: ['list', size],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) => getChatRoomList(pageParam, size),
  }),
  id: ({ recipientId }: { recipientId: number }) => ({
    queryKey: ['id', recipientId],
    queryFn: () => getChatRoomId(recipientId),
  }),
  countNewChat: () => ({
    queryKey: ['count', 'new-chat'],
    queryFn: () => getNewChatRoomCount(),
  }),
});
