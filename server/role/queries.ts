import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getRoleList } from './role';

export const roleQueries = createQueryKeys('role', {
  getRoleList: ({ roomId }: { roomId: number }) => ({
    queryKey: ['list', roomId],
    queryFn: () => getRoleList(roomId),
  }),
});
