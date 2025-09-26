import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getRoomLog } from './room-log';

export const roomLogQueries = createQueryKeys('roomLog', {
  getRoomLogList: ({ roomId, page, size }: { roomId: number; page: number; size: number }) => ({
    queryKey: ['list', roomId, page, size],
    queryFn: () => getRoomLog(roomId, page, size),
  }),
});
