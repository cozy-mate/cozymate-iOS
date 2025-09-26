import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getChatRoomId, getChatRoomList, getNewChatRoomCount } from './chat-room';

export const chatRoomQueries = createQueryKeys('chatRoom', {
  getChatRoomList: ({ page, size }: { page?: number; size?: number } = {}) => ({
    queryKey: ['list', page, size],
    queryFn: () => getChatRoomList(page, size),
  }),
  getChatRoomId: ({ recipientId }: { recipientId: number }) => ({
    queryKey: ['id', recipientId],
    queryFn: () => getChatRoomId(recipientId),
  }),
  getNewChatRoomCount: () => ({
    queryKey: ['count', 'new'],
    queryFn: () => getNewChatRoomCount(),
  }),
});
