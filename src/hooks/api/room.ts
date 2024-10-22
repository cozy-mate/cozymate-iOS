import { useSuspenseQuery } from '@tanstack/react-query';

import { getRoomData } from '@server/api/room';
import { GetRoomDataResponse } from '@server/responseTypes/room';

export const useGetRoomData = (
  roomId: number,
): { data: GetRoomDataResponse; refetch: () => void } => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['roomData', roomId],
    queryFn: () => getRoomData(roomId),
    select: (response: GetRoomDataResponse) => {
      return response;
    },
  });

  console.log(data);
  return { data, refetch };
};
