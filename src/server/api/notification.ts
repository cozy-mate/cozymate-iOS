import { GetAxiosInstance } from '@axios/axios.method';

import { GetNotificationResponse } from '@server/responseTypes/notification';

export const getNotificationList = async (): Promise<GetNotificationResponse> => {
  const response = await GetAxiosInstance<GetNotificationResponse>(`/notificationLogs`);

  return response.data;
};
