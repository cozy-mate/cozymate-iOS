import { GetAxiosInstance } from '@axios/axios.method';
import { GetRoomLogResponse } from '@server/responseTypes/room-log';

export const getRoomLog = async (
  roomId: number,
  page?: number,
  size?: number,
): Promise<GetRoomLogResponse> => {
  const response = await GetAxiosInstance<GetRoomLogResponse>(`/roomlog/${roomId}`, {
    params: {
      page: page,
      size: size,
    },
  });

  return response.data;
};
