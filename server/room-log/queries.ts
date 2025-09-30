import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getRoomLog } from './room-log';

export const roomLogQueries = createQueryKeys('roomLog', {
  list: ({ roomId, size }: { roomId: number; size: number }) => ({
    queryKey: ['list', roomId, size],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) => getRoomLog(roomId, pageParam, size),
  }),
});
