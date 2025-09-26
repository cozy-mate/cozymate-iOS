import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getNotificationLog } from './notification';

export const notificationQueries = createQueryKeys('notification', {
  list: ({ size }: { size?: number } = {}) => ({
    queryKey: ['list', size],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) => getNotificationLog(pageParam, size),
  }),
});
