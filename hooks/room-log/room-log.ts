import { useInfiniteQuery } from '@tanstack/react-query';

import { getRoomLog } from '@/server/room-log/room-log';

export const useGetRoomLog = (roomId: number) => {
  return useInfiniteQuery({
    queryKey: [`/roomlog/${roomId}`, roomId],
    queryFn: ({ pageParam }) => getRoomLog(roomId, pageParam, 5),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
    enabled: roomId !== 0,
  });
};
