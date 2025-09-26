import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getChatRoomDetail } from './chat';

export const chatQueries = createQueryKeys('chat', {
  getChatRoomDetail: ({
    chatRoomId,
    page = 0,
    size = 5,
  }: {
    chatRoomId: number;
    page?: number;
    size?: number;
  }) => ({
    queryKey: [chatRoomId, page, size],
    queryFn: () => getChatRoomDetail(chatRoomId, page, size),
  }),
});
