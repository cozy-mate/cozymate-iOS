import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { queries } from '@/server';
import { GetNotificationLogResponse } from '@/server/notification/response';

export const useGetNotificationLog = () => {
  return useSuspenseInfiniteQuery({
    ...queries.notification.list({ size: 5 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: GetNotificationLogResponse) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};
