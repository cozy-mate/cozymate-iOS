import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { getRoomData, checkHasRoom } from '@server/api/room';
import { GetRoomDataResponse, CheckHasRoomResponse } from '@server/responseTypes/room';

export const useCheckHasRoom = (): {
  data: CheckHasRoomResponse | undefined;
  refetch: () => void;
} => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['hasRoom'],
    queryFn: () => checkHasRoom(),
    select: (reseponse: CheckHasRoomResponse) => {
      return reseponse;
    },
  });

  return { data, refetch };
};

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
