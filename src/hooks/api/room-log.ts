import { getRoomLog } from '@server/api/room-log';
import { GetRoomLogResponse } from '@server/responseTypes/room-log';
import { useSuspenseQuery } from '@tanstack/react-query';

// Room Log 조회
export const useGetRoomLog = (
  roomId: number,
): { data: GetRoomLogResponse; refetch: () => void } => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['roomlogdata', roomId],
    queryFn: () => getRoomLog(roomId),
    select: (response: GetRoomLogResponse) => {
      return response;
    },
    refetchInterval: 3000,
  });

  return { data, refetch };
};
