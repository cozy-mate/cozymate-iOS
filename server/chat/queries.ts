import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getChatRoomDetail } from './chat';

export const chatQueries = createQueryKeys('chat', {
  detail: ({ chatRoomId, size = 5 }: { chatRoomId: number; size: number }) => ({
    queryKey: [chatRoomId, size],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) =>
      getChatRoomDetail(chatRoomId, pageParam, size),
  }),
});
