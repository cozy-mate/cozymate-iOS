import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getTodoList } from './todo';

export const todoQueries = createQueryKeys('todo', {
  getTodoList: ({ roomId, timePoint }: { roomId: number; timePoint?: string }) => ({
    queryKey: ['list', roomId, timePoint],
    queryFn: () => getTodoList(roomId, timePoint),
  }),
});
