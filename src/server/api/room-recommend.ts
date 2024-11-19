import { GetAxiosInstance } from '@axios/axios.method';

import { GetRandomRoomResponse } from '@server/responseTypes/room-recommend';

export const getRandomRoom = async (
  size: number,
  page: number,
  sortType?: string,
): Promise<GetRandomRoomResponse> => {
  const response = await GetAxiosInstance<GetRandomRoomResponse>(`/rooms/list`, {
    params: {
      size: size,
      page: page,
      sortType: sortType,
    },
  });

  return response.data;
};
