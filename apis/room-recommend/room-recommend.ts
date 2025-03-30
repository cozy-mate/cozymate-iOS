import { GetAxiosInstance } from '@/axios/axios.method';

import { GetRecommendRoomListResponse } from './response';

export const getRecommendRoomList = async (
  size: number,
  page: number,
  sortType?: string,
): Promise<GetRecommendRoomListResponse> => {
  const response = await GetAxiosInstance<GetRecommendRoomListResponse>(`/rooms/list`, {
    params: {
      size,
      page,
      sortType,
    },
  });

  return response.data;
};
