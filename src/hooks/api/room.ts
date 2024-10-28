import { useQuery } from '@tanstack/react-query';

import { getRoomData } from '@server/api/room';
import { GetRoomDataResponse } from '@server/responseTypes/room';

export const useGetRoomData = (
  roomId: number,
): { data: GetRoomDataResponse | undefined; refetch: () => void } => {
  const { data, refetch } = useQuery({
    queryKey: ['roomData', roomId],
    queryFn: () => getRoomData(roomId),
    select: (response: GetRoomDataResponse) => {
      return response;
    },
    enabled: roomId !== 0,
  });

  console.log(data);
  return { data, refetch };
};
