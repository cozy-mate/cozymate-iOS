import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getTodoList } from './todo';

export const todoQueries = createQueryKeys('todo', {
  list: ({ roomId, timePoint }: { roomId: number; timePoint?: string }) => ({
    queryKey: [roomId, timePoint],
    queryFn: () => getTodoList(roomId, timePoint),
  }),
});
