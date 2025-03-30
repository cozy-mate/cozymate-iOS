import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getNotificationLog } from '@/apis/notification/notification';

export const useGetNotificationLog = () => {
  return useSuspenseInfiniteQuery({
    queryKey: [`/notificationLogs`],
    queryFn: ({ pageParam }) => getNotificationLog(pageParam, 5),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};
