import { useQuery } from '@tanstack/react-query';

import { getRandomRoom } from '@server/api/room-recommend';
import { GetRandomRoomResponse } from '@server/responseTypes/room-recommend';

// 방 추천 리스트 조회
export const useGetRandomRoom = (
  size: number,
): {
  data: GetRandomRoomResponse | undefined;
  refetch: () => void;
} => {
  const { data, refetch } = useQuery({
    queryKey: ['recommendRoomData'],
    queryFn: () => getRandomRoom(size),
    select: (response: GetRandomRoomResponse) => {
      return response;
    },
  });

  return { data, refetch };
};
