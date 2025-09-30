import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getRuleList } from './rule';

export const ruleQueries = createQueryKeys('rule', {
  list: ({ roomId }: { roomId: number }) => ({
    queryKey: ['list', roomId],
    queryFn: () => getRuleList(roomId),
  }),
});
