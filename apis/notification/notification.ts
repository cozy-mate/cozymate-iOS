import { GetAxiosInstance } from '@/axios/axios.method';

import { GetNotificationLogResponse } from './response';

export const getNotificationLog = async (
  page?: number,
  size?: number,
): Promise<GetNotificationLogResponse> => {
  const response = await GetAxiosInstance<GetNotificationLogResponse>(`/notificationLogs`, {
    params: {
      page,
      size,
    },
  });

  return response.data;
};
