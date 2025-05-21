import { GetAxiosInstance } from '@/axios/axios.method';

import { GetRoomLogResponse } from './response';

export const getRoomLog = async (
  roomId: number,
  page: number,
  size: number,
): Promise<GetRoomLogResponse> => {
  const response = await GetAxiosInstance<GetRoomLogResponse>(`/roomlog/${roomId}`, {
    params: {
      page,
      size,
    },
  });

  return response.data;
};
