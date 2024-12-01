import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getRoomLog } from '@server/api/room-log';

// Room Log 조회
export const useGetRoomLog = (roomId: number) => {
  return useSuspenseInfiniteQuery({
    queryKey: [`/roomlog/${roomId}`, roomId],
    queryFn: async ({ pageParam }) => {
      const response = await getRoomLog(roomId, pageParam);
      console.log(response);
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};
