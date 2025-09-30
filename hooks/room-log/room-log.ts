import { useInfiniteQuery } from '@tanstack/react-query';

import { GetRoomLogResponse } from '@/server/room-log/response';
import { queries } from '@/server';

export const useGetRoomLog = (roomId: number) => {
  return useInfiniteQuery({
    ...queries.roomLog.list({ roomId, size: 5 }),
    initialPageParam: 0,
    getNextPageParam: (lastPage: GetRoomLogResponse) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
    enabled: roomId !== 0,
  });
};
