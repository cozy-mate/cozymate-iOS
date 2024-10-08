import { GetAxiosInstance } from '@axios/axios.method';

import { GetRoomLogResponse } from '@server/responseTypes/room-log';

// 특정 방에 roomlog 목록 조회
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
