import { useSuspenseQuery } from '@tanstack/react-query';

import { getRandomRoom } from '@server/api/room-recommend';
import { GetRandomRoomResponse } from '@server/responseTypes/room-recommend';

// 방 추천 리스트 조회
export const useGetRandomRoom = (
  size: number,
  page: number,
  sortType?: string,
): {
  data: GetRandomRoomResponse;
  refetch: () => void;
} => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ['/rooms/list', size, page, sortType],
    queryFn: () => getRandomRoom(size, page, sortType),
    select: (response: GetRandomRoomResponse) => {
      return response;
    },
  });

  return { data, refetch };
};
