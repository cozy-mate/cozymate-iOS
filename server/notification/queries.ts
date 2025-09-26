import { createQueryKeys } from '@lukemorales/query-key-factory';
import { getNotificationLog } from './notification';

export const notificationQueries = createQueryKeys('notification', {
  getNotificationList: ({ page, size }: { page?: number; size?: number } = {}) => ({
    queryKey: ['list', page, size],
    queryFn: () => getNotificationLog(page, size),
  }),
});
