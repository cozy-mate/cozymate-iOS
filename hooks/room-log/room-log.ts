import { useInfiniteQuery } from '@tanstack/react-query';

import { getRoomLog } from '@/apis/room-log/room-log';
import { useHasRoomStore } from '@/zustand/room/room';

export const useGetRoomLog = () => {
  const { roomId } = useHasRoomStore();

  return useInfiniteQuery({
    queryKey: [`/roomlog/${roomId}`, roomId],
    queryFn: ({ pageParam }) => getRoomLog(roomId, pageParam, 5),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.result.hasNext) {
        return lastPage.result.page + 1;
      }
    },
  });
};
