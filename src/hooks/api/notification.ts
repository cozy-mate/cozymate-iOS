import { useSuspenseQuery } from '@tanstack/react-query';

import { getNotificationList } from '@server/api/notification';
import { GetNotificationResponse } from '@server/responseTypes/notification';

// 알림 목록 조회
export const useGetNotificationList = (): {
  data: GetNotificationResponse;
  refetch: () => void;
} => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['notificationlist'],
    queryFn: () => getNotificationList(),
    select: (reseponse: GetNotificationResponse) => {
      return reseponse;
    },
    refetchInterval: 3000,
  });

  return { data, refetch };
};
