import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getRoleList } from './role';

export const roleQueries = createQueryKeys('role', {
  list: ({ roomId }: { roomId: number }) => ({
    queryKey: [roomId],
    queryFn: () => getRoleList(roomId),
  }),
});
