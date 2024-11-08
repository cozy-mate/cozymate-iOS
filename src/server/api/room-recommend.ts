import { GetAxiosInstance } from '@axios/axios.method';

import { GetRandomRoomResponse } from '@server/responseTypes/room-recommend';

export const getRandomRoom = async (size: number): Promise<GetRandomRoomResponse> => {
  const response = await GetAxiosInstance<GetRandomRoomResponse>(`/rooms/list`, {
    params: {
      size: size,
    },
  });

  return response.data;
};
